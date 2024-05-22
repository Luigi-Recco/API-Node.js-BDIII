const express = require('express');
const app = express();

const mongoose = require('mongoose');

const Person = require("./models/Person")


app.use(express.urlencoded({
    extended : true
}))

app.use(express.json());

// Rotas
app.post('/Person',async (req,res)=> {
    const{name,salary,approved} = req.body

    const Person ={
        name,
        salary,
        approved
    }

    // C do Crud
    try
    {
        await Person.create(Person)
        
        res.status(201).json({massage:'Pessoa inserida no sistema com sucesso'})
    }
    catch(error){
        res.status(500).json({erro : error})
    }
})


// R do Crud
app.get('/Person',async (req,res)=> {
    try{
        const people = await Person.find()

        res.status(200).json(people)
    }
    catch(error){
        res.status(500).json({erro:error})

    }
})

app.get('/Person/:id', async (req,res)=>{
    const id = req.params.id

    try{
            const Person = await Person.findOne({_id:id})

            if(!Person){
                res.status(422).json({message:'Usuario não encontrado'})
                return
            }
            res.status(200).json(Person)
    }   
    catch(error){
        res.status(500).json({erro:error})
    }
})

// U do Crud

app.patch('/Person/:id', async (req,res)=>{

    const {name,salary,approved} = req.body

    const Person ={
        name,
        salary,
        approved
    }

    try{
        const updatedPerson = await Person.updatedOne({_id:id},Person)

        if(updatedPerson,matchedCound === 0){
            res.status(422).json({message: 'Usuario não encontrado'})
        }
    }
    catch(error){
        res.status(500).json({erro:error})
    }
})

//D do Crud

app.delete('/Person/:id', async (req,res)=>{
    const id = req.params.id

    const Person = await Person.findOne({_id:id})

    if(!Person){

        res.status(422).json({message:'Usuario não existe'})
    }

    try{

        res.status(200).json({message:'Usuario removido'})

    }
    catch(error){
        res.status(500).json({erro:error})
    }

})

let mongo= "mongodb://localhost:27017";

 mongoose.connect(
  mongo   
 ).then(
    ()=>
    {  console.log('ta foda')
     
    app.get('/',(req,res)=>{
            res.json({message:"O peso da noite"})
        });
   
    }
 ).catch((err)=>
 {
    console.log(err)
 })

   




app.listen(3000);