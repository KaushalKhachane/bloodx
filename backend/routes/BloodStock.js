import express from "express";
import { BloodStock } from "../models.js";

const router = express.Router();

router.get("/all", async (req, res) => {
  try {
    const stock = await BloodStock.find();

    res.json(stock);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
