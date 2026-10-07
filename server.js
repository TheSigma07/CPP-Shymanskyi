import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Підключення до MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Успішно підключено до MongoDB Atlas'))
    .catch((err) => console.error('❌ Помилка підключення до MongoDB:', err));

// Базовий маршрут
app.get('/', (req, res) => {
    res.send('API сервера магазину канцтоварів працює!');
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`🚀 Сервер запущено на порту ${PORT}`);
});
