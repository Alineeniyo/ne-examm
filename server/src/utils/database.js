import { Sequelize } from 'sequelize';
import { config } from 'dotenv';

config({ path: './.env' });

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

try {
    await sequelize.authenticate();
    console.log('Connected to database successfully');
} catch (err) {
    console.error('Failed to connect to database:', err);
}

export default sequelize;
