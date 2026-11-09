// preload.js
// Безпечний мост IPC
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("notesAPI", {
    loadNotes: () => ipcRenderer.invoke("notes:load"),
    saveNotes: (data) => ipcRenderer.invoke("notes:save", data),
});
