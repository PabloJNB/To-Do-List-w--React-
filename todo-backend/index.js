import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes.js";

const app = express();

// Configurar middleware
app.use(bodyParser.json()); // Parsear el cuerpo de las solicitudes a formato JSON
app.use(
  cors({
    origin: "http://localhost:5173", // Permitir solicitudes desde esta URL
    methods: ["GET", "POST", "PATCH", "DELETE"], // Métodos permitidos
  })
); // Habilitar CORS para todas las solicitudes

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

const PORT = process.env.PORT || 5001; // Puerto del servidor
const MONGOURL = process.env.MONGO_URL; // URL de conexión a MongoDB

// Conexión a MongoDB
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database connected successfully"); // Confirmación de conexión exitosa

    // Iniciar el servidor una vez conectada la base de datos
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.log(error)); // Manejo de errores en la conexión

// Definir rutas para las operaciones relacionadas con tareas
app.use("/todos", todoRoutes);
