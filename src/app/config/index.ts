import dotenv from "dotenv";


dotenv.config();

export default{
    PORT: process.env.PORT || 3000,
    MONGO_URI: process.env.MONGODB_URI,
    node_env: process.env.NODE_ENV || "development",
    BCRYPT_SALT: process.env.BCRYPT_SALT || 10,
}