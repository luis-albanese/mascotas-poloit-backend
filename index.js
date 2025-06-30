// dotenv como dependencia para manejar valiables de entorno
import dotenv from "dotenv";
// express como dependencia para levantar servidor.
import express from "express";
// cors para configurar ENDPOINTS disponibles para utilizar en nuestra API
import cors from "cors";
// app contiene rutas de la API a crear
import app from "./src/app.js";
// Manejador de errores
import errorHandler from "./src/middlewares/errorHandler.js";
// Iniciamos dotenv
dotenv.config();
// Instanciamos con process.env.SERVER_PORT a la variable de entorno
const SERVER_PORT = process.env.SERVER_PORT || 3001;
// Iniciamos express
const server = express();
// Configuración de cors para habilitar metodos
server.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  })
);
// Indicamos '/api' como ruta principal
server.use("/", app);
// Utilizamos nuestro manejador de errores
server.use(errorHandler);
// Servidor ON
server.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});
