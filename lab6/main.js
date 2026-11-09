// main.js
// Головний процес Electron для десктопного магазину PaperCraft
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const fs = require("fs");

// Отримання шляху до файлу papercraft-data.json
function getDataFilePath() {
    return path.join(app.getPath("userData"), "papercraft-data.json");
}

// Початковий каталог канцтоварів
const INITIAL_ITEMS = [
    { id: "1", title: "Набір скріпок та затискачів", price: 40, icon: "📎", done: false },
    { id: "2", title: "Ножиці канцелярські", price: 50, icon: "✂️", done: false },
    { id: "3", title: "Щоденник датований", price: 210, icon: "📙", done: false },
    { id: "4", title: "Набір кольорових олівців", price: 140, icon: "✏️", done: false },
    { id: "5", title: "Альбом для малювання", price: 65, icon: "🎨", done: false },
    { id: "6", title: "Маркери для виділення (4 шт)", price: 95, icon: "✏️", done: false },
    { id: "7", title: "Набір гелевих ручок", price: 120, icon: "📝", done: false },
    { id: "8", title: "Зошит 48 арк.", price: 35, icon: "📓", done: false }
];

function createWindow() {
    const win = new BrowserWindow({
        width: 900,
        height: 800,
        title: "PaperCraft Desktop",
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    win.loadFile(path.join(__dirname, "renderer", "index.html"));
}

// Завантаження даних із JSON-файлу
ipcMain.handle("notes:load", () => {
    try {
        const filePath = getDataFilePath();
        console.log("Шлях до файлу даних:", filePath);

        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, "utf-8");
            return JSON.parse(data);
        }
        return null;
    } catch (error) {
        console.error("Помилка читання файлу:", error);
        return null;
    }
});

app.whenReady().then(() => {
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});