const express = require('express')

const exphbs = require('express-handlebars')

const fileUpload = require('express-fileupload');

const mysql = require('mysql');
const Connection = require('mysql/lib/Connection');

const app =express()
app.use(fileUpload());

const port = process.env.PORT || 5000;

const handlebars = exphbs.create({ extname: '.hbs',});
app.engine('.hbs', handlebars.engine);
app.set('view engine', '.hbs');


app.use(express.static('public'))
app.use(express.static('upload'))





const pool = mysql.createPool({
    connectionLimit: 10,
    host : 'localhost',
    user : 'root',
    password: '',
    database: 'userprofile'
})


pool.getConnection((err, connection)=>{
    if(err) throw err
    console.log('connected!')
})









app.get('',(req, res)=>{
   

    pool.getConnection((err, connection)=>{
        if(err) throw err
        console.log('connected!')


        connection.query('SELECT * FROM user WHERE id=id',(err ,rows)=>{

            connection.release()

            if(!err){
                res.render("index", { rows })
            }
        })
    })
    
    

})




app.post('', (req, res) => {
    let sampleFile;
    let uploadPath;
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).send('No files were uploaded.');
    }
  
    
    sampleFile = req.files.sampleFile;
    uploadPath = __dirname + '/upload/' + sampleFile.name;

   


  
    console.log(sampleFile);
  
   
    sampleFile.mv(uploadPath, function (err) {
      if (err) return res.status(500).send(err);


        
    //   res.send('file uploaded!')



    pool.getConnection((err, connection)=>{
        if(err) throw err
        console.log('connected!')


        connection.query('UPDATE user SET profile_image =? WHERE id=id',[sampleFile.name],(err ,rows)=>{

            connection.release()

            if(!err){
                res.redirect('/')
            }else{
                console.log(err)
            }
        })
    })
       
      });
  });
  







app.listen(port,()=>{
    console.log(`servidor rodando na porta ${port}`)
})