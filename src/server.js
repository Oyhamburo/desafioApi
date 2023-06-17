import express from "express";
import cors from "cors";
import dotevn from "dotenv";
import { userRouter } from "./routes/index.routes.js";
import { createServer as HttpServer } from "http";

dotevn.config();

const app = express();
const httpServer = new HttpServer(app);

// levanto variables de un archivo .env
const PORT = process.env.PORT || 2000;
const URLCORS = process.env.URLCORS || "http://127.0.0.1:5173";

// habilito el cors desde la url del front que voy a utilizar
app.use(
  cors({
    origin: URLCORS,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// defino rutas a utilizar
app.use("/user", userRouter);

httpServer.listen(PORT, async () => {
  console.log(`Servidor http escuchando en el puerto ${PORT}`);
});
