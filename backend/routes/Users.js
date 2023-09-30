import express from "express";
import { User } from "../models.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const newUser = new User({
      user_email: req.body.user_email,
      user_name: req.body.user_name,
      user_phone_no: req.body.user_phone_no,
      user_gender: req.body.user_gender,
      user_address: req.body.user_address,
      user_password: req.body.user_password,
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
    const user = await User.findOne({ user_email, user_password });

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: "Wrong username/password !!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;



