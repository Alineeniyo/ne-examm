
import jsonwebtoken from 'jsonwebtoken'
import { DataTypes, Model } from 'sequelize'
const { sign } = jsonwebtoken
import sequelize from '../utils/database.js'

export class User extends Model {
    generateAuthToken() {
        const token = sign(
            { _id: this._id, role: this.role },
            (process.env.JWT).trim()
        )
        return token;
    }
}

User.init({
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['admin']]
        }
    }
}, {
    sequelize,
    modelName: 'User'
})

try {
    User.sync()
} catch (error) {
    console.log(error)
}

export default User;
