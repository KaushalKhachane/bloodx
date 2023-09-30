import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import usersRouter from "./routes/Users.js"; 
import appointmentsRouter from "./routes/Appointments.js"; 
import hospitalsRouter from "./routes/Hospitals.js"; 
import bloodRequestRouter from "./routes/BloodRequests.js";
import bloodStockRouter from "./routes/BloodStock.js";
import adminRouter from "./routes/Admin.js";

const app = express();

app.use(express.json());
app.use(cors());


app.use("/api/users", usersRouter);
app.use("/api/appointments", appointmentsRouter);
app.use("/api/hospitals", hospitalsRouter);
app.use("/api/bloodrequests", bloodRequestRouter);
app.use("/api/bloodstock", bloodStockRouter);
app.use("/api/admin", adminRouter);


const PORT = process.env.PORT || 8801;

// Connect to MongoDB Atlas
mongoose.connect(
  "mongodb+srv://knk29:khachane29@atlascluster.wtf8ey2.mongodb.net/blood_bank?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
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
