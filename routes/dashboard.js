import express from "express"
import { client } from "../connection.js"
import Authorization from "../middleware/Authorization.js"


export const dashboardRouter = express.Router() 

dashboardRouter.post("/" , Authorization , async (req, res)=>{
    try {
        
        const user = await client.query(
            "SELECT * FROM users WHERE user_id = $1",[req.user]
        );
        res.send(user.rows[0])
       
    } catch (error) {
        console.log(error.message + " YE KYA BACKWASS hori  h ")
        res.status(500).send("Server error");
    }
})  