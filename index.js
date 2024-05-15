const express = require('express');
const mongoose = require('mongoose');

const app = express();

app.use(express.urlencoded({
    extended : true
}))

app.use(express.json());

let mongo= "mongodb://localhost:27017";

 mongoose.connect(
  mongo   
 ).then(
    ()=>
    {
            console.log('ta foda')
        app.get('/',(req,res)=>{
            res.json({message:"O peso da noite"})
        });
   
    }
 ).catch((err)=>
 {
    console.log(err)
 })

   




app.listen(3000);