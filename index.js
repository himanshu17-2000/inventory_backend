import bodyParser from 'body-parser';
import express from 'express'
import {client} from './connection.js'
import {router} from './routes/JwtAuth.js'
import { dashboardRouter } from './routes/dashboard.js';
import { inventoryRouter } from './routes/Inventory.js';
import cors from 'cors'
const app = express() 
const port = process.env.PORT || 5000 ;
app.listen(port , ()=>{
    console.log("listeding to port "+ port ) ;
})

app.use(cors())
app.use(express.json()) 
app.use(bodyParser.urlencoded({extended:true}))
app.use('/auth' , router )
app.use('/inventory', inventoryRouter)
app.use('/dashboard',dashboardRouter)
 
client.connect((err)=>{
    if(err){
        
        console.log(err.message)
    }
    else{
        console.log(' database Connected') ; 
    }
   
}) ;  