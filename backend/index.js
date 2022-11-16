import express from "express"
import mysql from "mysql"
import cors from "cors"

const app=express()

app.use(express.json())
app.use(cors())

app.listen(8801,()=>{
    console.log("Connected to backend!")
})


// var mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"blood_bank"
});

app.get("/appointments",(req,res)=>{
  const q="SELECT * from appointments"
  db.query(q,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.post("/users",(req,res) => {
  const q = "INSERT INTO users(`user_email`,`user_name`,`user_phone_no`,`user_gender`,`user_address`,`user_password`) VALUES (?)";
  const values = [
    req.body.user_email,
    req.body.user_name,
    req.body.user_phone_no,
    req.body.user_gender,
    req.body.user_address,
    req.body.user_password,
  ];


  db.query(q, [values], (err, data) => {
    if(err) return res.json(err);
    return res.json("User has been created successfully.");
  });
});

app.post("/userlogin", (req,res)=>{
  const user_email = req.body.user_email;
  const user_password = req.body.user_password;
  const q = "SELECT * FROM users WHERE user_email = ? AND user_password = ?";

  db.query(q,[user_email,user_password],(err, result) => {
    if(err){
      res.send({err: err});
    }

    if(result.length>0){
      res.send(result);
    }
    else{
      res.send({message: "Wrong username/password !!"});
    }
  });
});

app.post("/adminlogin", (req,res)=>{
  const admin_name = req.body.admin_name;
  const admin_password = req.body.admin_password;
  const q = "SELECT * FROM admins WHERE admin_name = ? AND admin_password = ?";

  db.query(q,[admin_name,admin_password],(err, result) => {
    if(err){
      res.send({err: err});
    }

    if(result){
      res.send(result);
    }
    else{
      res.send({message: "Wrong username/password !!"});
    }
  });
});



app.post("/bookappnt",(req,res) => {
  const q = "INSERT INTO appointments(`app_email`,`app_name`,`app_phone_no`,`app_blood_type`,`app_camp_address`,`app_age`,`app_diabetic`,`app_date`,`app_time`) VALUES (?)";
  const values = [
    req.body.app_email,
    req.body.app_name,
    req.body.app_phone_no,
    req.body.app_blood_type,
    req.body.app_camp_address,
    req.body.app_age,
    req.body.app_diabetic,
    req.body.app_date,
    req.body.app_time,
    
  ];


  db.query(q, [values], (err, data) => {
    if(err) return res.json(err);
    return res.json("Appointment has been booked successfully.");
  });
});
