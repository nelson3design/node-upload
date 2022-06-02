const express = require('express')

const exphbs = require('express-handlebars')

const fileUpload = require('express-fileupload');


const app =express()

const port = process.env.PORT || 5000;

const handlebars = exphbs.create({ extname: '.hbs',});
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');




app.get('/',(req,res)=>{
    res.render("index")
})

app.post('/',(req,res)=>{
   let sampleFile;
   let upladPath

   if(!req.files || Object.keys(req.files).length ===0){
       return res.status(400).send('No files were uploaded')
   }
})

app.listen(port,()=>{
    console.log(`servidor rodando na porta ${port}`)
})