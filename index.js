const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql')
const app = express();

app.use(cors());
app.use(bodyparser.json());
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'userinfo',
    port:3306
})
db.connect(err=>{
    if(err){console.log('err')}
    console.log('database connected successfull')
})

app.get('/users',(req,res)=>{
    let qrr = `SELECT * FROM users`;
    db.query(qrr,(err,results)=>{
        if(err){
            console.log(err,`errs`)
        }
        if(results.length>0){
            res.send({
                message:'All users Data',
                data:results
            })
        }
    })
})
app.get('/user/:id',(req,res)=>{
    let qrId = (req.params.id);
    let qr = `SELECT  * FROM users where id =${qrId}`
    db.query(qr,(err,results)=>{
        if(err){
            console.log(err)
        }
        if(results.length>0){
            res.send({
                message:"Get Data by Id",
                data:results
            })
        }else{
            res.send({
                message:"Data not found"
            })
        }
    })
})

//post data
app.post('/user',(req,res)=>{
   // console.log(req.body,'Post Data success')
   let fullName = req.body.fullname;
   let eMail = req.body.email;
   let Mobile= req.body.mobile;

   let qr = `insert into users(fullname,email,mobile)value(`&{fullName}`,`&{eMail}`,`&{Mobile}`)`;
   db.query(qr,(err,results)=>{
    if(err){
        console.log(err)
    }
    res.send({
        message:"Data created successfully",
        data:results
    })
   })
})
//update data
app.put('/user/:id',(req,res)=>{
    let uID = req.param.id;
    let fullName = req.body.fullname;
   let eMail = req.body.email;
   let Mobile= req.body.mobile;
   let qr = `update users set fullname = '${fullName}',email = '${eMail}', mobile = '${Mobile}' where id = '${uID}'`
   db.query(qr,(err,results)=>{
    if(err){
        console.log(err)
    }
    res.send({
        message:"Data updated successsfully",
        data:results
    })
   })
})
//delete
app.delete('/user/:',(req,res)=>{
    let uID = req.params.id;
    let qr = `delete from users where id = '${uID}' `;
    db.query(qr,(err,results)=>{
        if(err){
            console.log(err)
        }res.send({
            message:"Data deleted"
        })
    })

})

app.listen(3000, ()=> {
    console.log("server is running on 3000 PORT");
})