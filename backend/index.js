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



app.post("/bookappnts",(req,res) => {
  const q = "INSERT INTO appointments (`app_email`,`app_name`,`app_phone_no`,`app_blood_type`,`app_camp_address`,`app_age`,`app_diabetic`,`app_date`,`app_time`,`app_donated`) VALUES (?)";
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
    req.body.app_donated,
  ];


  db.query(q, [values], (err, data) => {
    if(err) return res.json(err);
    return res.json("Appointment has been booked successfully.");
  });
});


app.post("/hospitals",(req,res) => {
  const q = "INSERT INTO hospitals (`hospital_name`,`hospital_address`,`hospital_phone_no`,`hospital_password`) VALUES (?)";
  const values = [
    req.body.hospital_name,
    req.body.hospital_address,
    req.body.hospital_phone_no,
    req.body.hospital_password,
  ];


  db.query(q, [values], (err, data) => {
    if(err) return res.json(err);
    return res.json("Hospital has been added successfully.");
  });
});

app.post("/hospitallogin", (req,res)=>{
  const reg_no = req.body.reg_no;
  const hospital_password = req.body.hospital_password;
  const q = "SELECT * FROM hospitals WHERE reg_no = ? AND hospital_password = ?";

  db.query(q,[reg_no,hospital_password],(err, result) => {
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

app.delete("/appointments/:app_email", (req,res)=>{
  const email = req.params.app_email;
  const q="DELETE FROM appointments WHERE app_email = ?"
  db.query(q,[email],(err,data)=>{
    if(err) return res.json(err);
    return res.json("Appointment has been deleted successfully!!");
  })
})

app.put("/appointments/:app_email", (req,res)=>{
  const email = req.params.app_email;
  const q="UPDATE appointments SET `app_donated`='Y' WHERE app_email = ?"
  db.query(q,[email],(err,data)=>{
    if(err) return res.json(err);
    return res.json("Appointment has been approved successfully!!");
  })
})

app.post("/requests",(req,res) => {
  const q = "INSERT INTO requests(`reg_no`,`request_blood_type`,`request_units`,`urgent`,`request_delivered`) VALUES (?)";
  const values = [
    req.body.reg_no,
    req.body.request_blood_type,
    req.body.request_units,
    req.body.urgent,
    req.body.request_delivered,
  ];


  db.query(q, [values], (err, data) => {
    if(err) return res.json(err);
    return res.json("Request has been created successfully.");
  });
});

app.get("/requests",(req,res)=>{
  const q="SELECT * from requests"
  db.query(q,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.delete("/requests/:reg_no", (req,res)=>{
  const regno = req.params.reg_no;
  const q="DELETE FROM requests WHERE reg_no = ?"
  db.query(q,[regno],(err,data)=>{
    if(err) return res.json(err);
    return res.json("Request has been deleted successfully!!");
  })
})

app.put("/requests/:reg_no", (req,res)=>{
  const regno = req.params.reg_no;
  const q="UPDATE requests SET `request_delivered`='Y' WHERE reg_no = ?"
  db.query(q,[regno],(err,data)=>{
    if(err) return res.json(err);
    return res.json("Request has been approved successfully!!");
  })
})

app.get("/appnts",(req,res)=>{
  const q="SELECT app_email,app_name,app_phone_no,app_blood_type,app_camp_address,app_age,app_diabetic,app_date,app_time,app_donated from appointments WHERE `app_donated`='Y'"
  db.query(q,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get("/hospitals",(req,res)=>{
  const q="SELECT * from hospitals"
  db.query(q,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get("/stock",(req,res)=>{
  const q="SELECT * from stock"
  db.query(q,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get("/bgdonor",(req,res)=>{
  const q="SELECT app_blood_type,count(*) as count from appointments group by app_blood_type"
  db.query(q,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get("/bgrequests",(req,res)=>{
  const q="SELECT request_blood_type,count(*) as count from requests group by request_blood_type"
  db.query(q,(err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})