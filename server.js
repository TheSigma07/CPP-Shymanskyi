import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "./services/db.js";
import stationeryRoutes from "./routes/stationeryRoutes.js";

dotenv.config({ override: true });

const app = express();
const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

// Логуємо кожен вхідний запит
app.use((req, res, next) => {
    console.log(`${req.method} ${req.originalUrl}`);
    next();
});

app.get("/", (req, res) => {
    res.send("API магазину канцелярії PaperCraft працює!");
});

// Маршрути для канцелярії
app.use("/api/stationery", stationeryRoutes);

connectDB(process.env.MONGO_URI).catch((err) =>
    console.error("Помилка підключення до MongoDB:", err)
);

app.listen(PORT, () => {
    console.log(`Сервер магазину канцелярії запущено на порту ${PORT}`);
});