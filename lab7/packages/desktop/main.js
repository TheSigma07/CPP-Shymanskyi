import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { CatalogService } from "@papercraft/core";
import { FileStorageAdapter } from "./fileStorageAdapter.js";
import { createHandlers } from "./ipcHandlers.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.whenReady().then(() => {
    const dataPath = path.join(app.getPath("userData"), "papercraft-monorepo.json");
    const adapter = new FileStorageAdapter(dataPath);
    const service = new CatalogService(adapter);
    const handlers = createHandlers(service);

    ipcMain.handle("items:list", (_, query) => handlers.list(query));
    ipcMain.handle("items:add", (_, payload) => handlers.add(payload));
    ipcMain.handle("items:remove", (_, id) => handlers.remove(id));
    ipcMain.handle("items:toggleCart", (_, id) => handlers.toggleCart(id));

    const win = new BrowserWindow({
        width: 960,
        height: 720,
        webPreferences: {
            preload: path.join(__dirname, "preload.cjs"),
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    win.loadFile(path.join(__dirname, "renderer", "index.html"));
});