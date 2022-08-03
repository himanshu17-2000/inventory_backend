import jwt from "jsonwebtoken"
import 'dotenv/config';
export const  jwtgnerator = (user_id)=>{
    const payload ={
        user : user_id
    }
   return jwt.sign(payload , process.env.jwtSecret , {expiresIn : "24hr"} ) 
}

