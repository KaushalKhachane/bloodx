import express from "express";
import { User } from "../models.js";

const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


router.post("/signup", async (req, res) => {
  try {
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      user_email: req.body.user_email,
      user_name: req.body.user_name,
      user_phone_no: req.body.user_phone_no,
      user_gender: req.body.user_gender,
      user_address: req.body.user_address,
      user_password: hashedPassword,
    });

    await newUser.save();
    res.json("User has been created successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/login", async (req, res) => {
  const { user_email, user_password } = req.body;

  try {
    const user = await User.findOne({ user_email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      user_password,
      user.user_password
    );

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, "mysecretkey");
    res.status(200).json({ token });

    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;



