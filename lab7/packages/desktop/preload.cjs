const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("catalogAPI", {
    list: (query) => ipcRenderer.invoke("items:list", query),
    add: (payload) => ipcRenderer.invoke("items:add", payload),
    remove: (id) => ipcRenderer.invoke("items:remove", id),
    toggleCart: (id) => ipcRenderer.invoke("items:toggleCart", id)
});