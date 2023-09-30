import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import usersRouter from "./routes/Users.js"; 
import appointmentsRouter from "./routes/Appointments.js"; 
import hospitalsRouter from "./routes/Hospitals.js"; 
import bloodRequestRouter from "./routes/BloodRequests.js";
import bloodStockRouter from "./routes/BloodStock.js";
import adminRouter from "./routes/Admin.js";
import { User } from "../backend/models.js";

import nodemailer from "nodemailer";
import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());
app.use(cors());


app.use("/api/users", usersRouter);
app.use("/api/appointments", appointmentsRouter);
app.use("/api/hospitals", hospitalsRouter);
app.use("/api/bloodrequests", bloodRequestRouter);
app.use("/api/bloodstock", bloodStockRouter);
app.use("/api/admin", adminRouter);

let otp;
app.post("/send-otp", async (req, res) => {
  const { user_email, user_type } = req.body;
  const user = await User.findOne({ user_email });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  otp = otpGenerator.generate(6, {
    digits: true,
    alphabets: false,
    upperCase: false,
    specialChars: false,
  });

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "khachanekn29@gmail.com",
      pass: "nzqboskwgmfaxfsw"
    },
  });

  const mailOptions = {
    from: "khachanekn29@gmail.com",
    to: user_email,
    subject: "OTP for Login to BloodX !!",
    text: `Your OTP for login is: ${otp}`,
  };

  transporter.sendMail(mailOptions, async (error, info) => {
    if (error) {
      return res.status(500).json({ message: "Error sending OTP", error:error });
    }

    res.status(200).json({ message: "OTP sent successfully" });
  });
});

app.post("/verify-otp", async (req, res) => {
  const { user_otp } = req.body;
  const { user_email } = req.body;
  const user = await User.findOne({ user_email });

  if (user_otp !== otp) {
    return res.status(401).json({ message: "Invalid OTP" });
  }

  const donor_token = jwt.sign({ userId: user._id }, "my-secret-key", {});
  localStorage.setItem("donor_token", donor_token);
  localStorage.setItem("user_type", "donor");
  res.status(200).json({ token });
});


const PORT = process.env.PORT || 8801;

mongoose.connect(
  "mongodb+srv://knk29:khachane29@atlascluster.wtf8ey2.mongodb.net/blood_bank?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB Connection Error:", err);
});

db.once("open", () => {
  console.log("Connected to MongoDB Atlas!");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
