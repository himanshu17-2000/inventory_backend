import express from 'express' 
import { client } from '../connection.js';
 export  const router = express.Router()
 import {jwtgnerator} from '../utils/JwtGenerator.js'
import validInfo from '../middleware/ValidInfo.js'
import Authorization from "../middleware/Authorization.js" 
import jwt from 'jsonwebtoken'

// resgistering 
router.post("/register" ,validInfo , async (req,res)=>{
    try{
        // 1 destructure req.body   
        
        const {id , username , email , password} = req.body ;
        //2 check if user exixt if exist (send error)
        const user  = await client.query("SELECT * FROM users WHERE user_id = $1 ",[id])

       if(user.rows.length !== 0){
        return res.status(401).json("User already exist!");
       } 

         // 4 enter the new user inside the database
        const newUser = await client.query(
            "INSERT INTO users VALUES ($1 , $2 , $3, $4 ) RETURNING * "
            , [id , username ,email, password] 
        )
        console.log(newUser)
        // 5 generating out jwt token
        const token =  jwtgnerator(newUser.rows[0].user_id) ;
        return res.json({ token });
 
    }
    catch(err){ 
        console.log(err.message + "login , INDEX.JS " )
        res.status(500).send("send server me error " )
    }
})  
// login 
router.post("/login" ,validInfo , async(req, res)=>{
    try{
        // 1 destructure the req.body 
         const {email , password} = req.body ;
        // 2 check if user doesn't exist (thorw erqror) 
         const user = await client.query("SELECT * FROM users WHERE user_email = $1 " ,[email]);
         if(user.rows.length === 0 ){
            return res.status(401).json("Invalid Credential");
         }
        // 3 check if incomming password is same as database password
        if(!password == user.rows[0].user_password){
            return res.status(401).json("Invalid Credential");
        }
        //4 give jwt token 
        const token =  jwtgnerator(user.rows[0].user_id)
        return res.json({ token });
    }
    catch(err){
        console.log(err + "LOGIN , INDEX.JS ")
        console.log("login route me error " + err) ;
    }
})

 router.post("/is-verify" , Authorization , async (req,res)=>{
    try{

        res.json(true) ;
       
    }
    catch(err){
       console.log(err + " IS VERIFY , jwtAuth.JS ")
        res.status(403).send("Not authorize") 
    } 
 })






 












router.get("/users" , async (req, res)=>{
    try{
        const users = await client.query("SELECT * FROM users u JOIN items i  ") ;
        return res.status(500).send(users.rows) ;
    }
    catch(err){
        console.log(err) ;
    }
})