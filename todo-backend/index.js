import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes.js";

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
); // Habilitar CORS para todas las solicitudes
dotenv.config();

const PORT = process.env.PORT || 5001;
const MONGOURL = process.env.MONGO_URL;

// Conexion a MongoDB
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database connected succsessful");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.use("/todos", todoRoutes);
