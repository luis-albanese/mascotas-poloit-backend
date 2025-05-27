import express from "express";
import HTTP_STATUS from "./utils/httpStatus.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (_req, res) => {
  const responseServer = {
    status: 200,
    app: "API-Adopción-Mascotas",
    routes: {
      index: "/api",
      Users: "/users",
      Pets: "/pets",
    },
  };
  res.status(HTTP_STATUS.OK).json(responseServer);
});

export default app;
