
require("dotenv").config(); 


const MONGODB_URI:string|undefined = process.env.NODE_ENV === "test" ? process.env.MONGODBTEST_URI : process.env.MONGODB_URI;

const JWT_SECRET_KEY = process.env.SECRET;

const envs = {
    MONGODB_URI,
    JWT_SECRET_KEY 
}

export default envs;