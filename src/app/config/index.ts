import dotenv from "dotenv";


dotenv.config();

export default{
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGODB_URI,
    node_env: process.env.NODE_ENV || "development",
    BCRYPT_SALT: process.env.BCRYPT_SALT || 10,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN : process.env.JWT_EXPIRES_IN || "1d"
}