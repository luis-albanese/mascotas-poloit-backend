// dotenv como dependencia para manejar valiables de entorno
import dotenv from "dotenv";
// express como dependencia para levantar servidor
import express from "express";

// Iniciamos dotenv
dotenv.config();
// Instanciamos con process.env.SERVER_PORT a la variable de entorno
const SERVER_PORT = process.env.SERVER_PORT || 3001;
// Iniciamos express
const server = express();
// Servidor ON
server.listen(SERVER_PORT, () => {
  console.log(`Server running on port ${SERVER_PORT}`);
});
