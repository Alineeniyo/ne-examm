import jsonwebtoken from 'jsonwebtoken';
import { DataTypes, Model } from 'sequelize';
const { sign } = jsonwebtoken;
import sequelize from '../utils/database.js';

export class Books extends Model {
    generateAuthToken() {
        const token = sign(
            { _id: this._id, role: this.role },
            (process.env.JWT).trim()
        );
        return token;
    }
}

Books.init({

    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    author: {
        type: DataTypes.STRING,
        allowNull: false
    },

    publisher: {
        type: DataTypes.STRING,
        allowNull: false
    },

    publicationYear: {
        type: DataTypes.DATE,
        allowNull: false
    },

    subject: {
        type: DataTypes.STRING,
        allowNull: false
    },

},
 {
   
    sequelize,
    modelName: 'books'
})
try{
    Books.sync()
}catch (ex){
    console.log(error)
}

export default Books;












