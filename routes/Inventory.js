import express from "express"
import { client } from "../connection.js"
// import Authorization from "../middleware/Authorization.js"
import {ImageHolder} from "../middleware/ImageHolder.js"
import path from 'path'
export  const inventoryRouter = express.Router() 

inventoryRouter.post("/add"  , async (req, res)=>{
    try {
         
        const item = await client.query(
            "INSERT INTO items VALUES ($1 ,$2 ,$3 , $4) ",[req.body.item_id , req.body.user_id , req.body.user_email , req.body.content]
        );
        
        return res.json(item.rows) ;
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server error");
    }
})  
inventoryRouter.post("/items" , async(req, res)=>{
    try {
        
        
        const items = await client.query(
            "SELECT * FROM items WHERE user_id = $1" , [req.body.id]
        );
        return res.status(200).json(items.rows) ;
        
    } catch (error) {
        console.log(error.message)
        res.status(500).send("Server error");
    }
})
inventoryRouter.delete("/delete/:id" , async(req , res)=>{
  
     let id = req.params.id
     const  deletequery =  client.query( `delete from items where item_id = ${id} :: VARCHAR  `
     , (err, result)=>{
        if(!err){
            return res.json("deleted item")
        }
        else{return res.json("delete qyery me dikkat " + err )}
    })
})
inventoryRouter.post('/image', ImageHolder.single('image') ,(req, res) => { 
    console.log(req.file)
    res.json('/image api'); 
});
inventoryRouter.get('/image/:filename', (req, res) => {
    const {filename} = req.params ;
    const dirname = path.resolve() ;
    const fullfilepath = path.join(dirname,'images/' + filename) ;
    
    return res.sendFile(fullfilepath);
});