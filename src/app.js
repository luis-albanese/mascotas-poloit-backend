import express from "express";
import HTTP_STATUS from "./utils/httpStatus.js";
import { userRoutes } from "./routes/userRoute.js";
import { petRoutes } from "./routes/petRoute.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (_req, res) => {
  const responseServer = {
    status: 200,
    app: "API-Adopción-Mascotas",
    routes: {
      index: "/",
      Users: "/api/users",
      Pets: "/api/pets",
    },
  };
  res.status(HTTP_STATUS.OK).json(responseServer);
});
app.use("/api/users", userRoutes());
app.use("/api/pets", petRoutes());

export default app;
