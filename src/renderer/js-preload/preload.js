/*
    The preload script contains all of the IPC logic to communicate with the main process.
    It avoids exposing node context to the renderer process which could lead to e.g. self-XSS
 */

const packageData = require("../../../package");
const {ipcRenderer} = require("electron");
const EventEmitter = require("events");

const api = new EventEmitter();

// Called when the UI wants to refresh the mod list
api.refreshModList = function () {
    ipcRenderer.send("get modlist");
};

// Fires an event on the DDMM object when the mod list has been retrieved
ipcRenderer.on("got modlist", (ev, list) => {
    api.emit("mod list", list);
});

// Restart
api.restart = function () {
    ipcRenderer.send("restart");
};

// Application version
api.version = packageData.version;

global.ddmm = api;
