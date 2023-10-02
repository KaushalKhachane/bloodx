import express from "express";
import { User } from "../models.js";

const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {storage} from "../firebase.js"
import { ref, uploadBytes } from "firebase/storage";

import multer from 'multer';
const upload = multer();



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

// router.post('/userProfile', async (req, res) => {
//   const {imageUpload} = req.body;
//   console.log(imageUpload)
//   const storageRef = ref(storage, 'images/' + imageUpload.name);

//    // Upload the image file to the specified path
//    return uploadBytes(storageRef, imageUpload)
//    .then((snapshot) => {
//      console.log("Image uploaded successfully!", snapshot);
//      // You can retrieve the download URL for the uploaded image
//     //  return getDownloadURL(storageRef);
//      console.log("Image uploaded successfully!", getDownloadURL(storageRef));
//    })
//    .catch((error) => {
//      console.error("Error uploading image:", error);
//    });
  
// });

router.post("/userProfile", upload.single("file"), (req, res) => {
  // console.log("hello");
  const {file} = req;
  console.log(file);
  try {
    if (!file) {
      return res.status(400).json({ error: "No file provided" });
    }

    // const file = req.files.file;

    // Upload the file to Firebase Storage
    const fileRef = storage.ref("images/" + file.name);
    fileRef.put(file.data).then(() => {
      return res.status(200).json({ message: "File uploaded successfully" });
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: error[0] });
  }
});

export default router;



