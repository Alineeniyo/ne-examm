import Joi from "joi";
import { errorResponse } from "../utils/api.response.js";

export async function validateBookRegistration(req, res, next) {
    try{
        const schema = Joi.object({
            name: Joi.string().required().label("name"),
            author: Joi.string().required().label("author"),
            publisher: Joi.string().required().label("publisher"),
            publicationYear: Joi.date().required().label("publicationYear"),
            subject: Joi.string().required().label("subject")
            
        });

        const { error } = schema.validate(req.body);
        if (error) return errorResponse(error.message, res);

        return next();
    }
    catch (ex) {
        return errorResponse(ex.message, res);
    }}