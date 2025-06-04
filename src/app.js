import express from "express";
import HTTP_STATUS from "./utils/httpStatus.js";
import { userRoutes } from "./routes/userRoute.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (_req, res) => {
  const responseServer = {
    status: 200,
    app: "API-Adopción-Mascotas",
    routes: {
      index: "/",
      Users: "/users",
      Pets: "/pets",
    },
  };
  res.status(HTTP_STATUS.OK).json(responseServer);
});
app.use("/users", userRoutes());

export default app;
