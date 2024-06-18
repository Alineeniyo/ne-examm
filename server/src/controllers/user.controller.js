import { compare, genSalt, hash } from "bcrypt";
import { User } from "../models/user.model.js";
import { createSuccessResponse, errorResponse, serverErrorResponse, successResponse } from "../utils/api.response.js";
import _ from "lodash";

export const registerAsAdmin = async (req, res) => {
  console.log('registerAsAdmin', req.body);
  try {
    let checkEmail = await User.findOne({ where: { email: req.body.email } })
    if (checkEmail) return errorResponse("Email is already registered!",res)


    let user = new User(
      _.pick(req.body, [
        "firstname",
        "lastname",
        "email",
        "password",

      ])
    );

    user.role = "admin";

    //added salt to encrypt our password
    const salt = await genSalt(10);
    user.password = await hash(user.password, salt);

    try {
      await user.save();
      return createSuccessResponse("User registered successfully. You can now login", {}, res);
    } catch (ex) {
      console.log(ex);
      return errorResponse(ex.message, res);
    }
  } catch (ex) {
    console.log(ex);
    return serverErrorResponse(ex,res)
  }
};

export const login = async(req,res)=>{
    try{
      let user = await User.findOne({ where: { email: req.body.email } });
      if (!user) return errorResponse("Invalid email or password!",res);

        const validPassword = await compare(req.body.password, user.password);
        if (!validPassword)
          return errorResponse("Invalid email or password!",res);
    
        const token = user.generateAuthToken();

        return successResponse("Login successful!",{access_token: token},res);
    }
    catch (ex) {
        console.log(ex)
        return serverErrorResponse(ex,res)
    }
}

export const getProfile = async(req,res)=>{
    try{
        let user = await User.findByPk(req.user._id);
        if (!user) return errorResponse("User not found!",res);

        return successResponse("Profile",user,res)
    }
    catch (ex) {
        return serverErrorResponse(ex,res)
    }
}
