import express from "express";
import { Admin } from "../models.js";

const router = express.Router();

router.get("/login", async (req, res) => {
  const { admin_name, admin_password } = req.body;

  try {
    const admin = await Admin.findOne({ admin_name, admin_password });

    if (admin) {
      res.json(admin);
    } else {
      res.status(404).json({ message: "Wrong username/password !!" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
