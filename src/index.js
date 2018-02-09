const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;

app.on('ready', ()=>{
    mainWindow = new BrowserWindow({
        width: 1100, 
        height: 650,
        resizable: false,
        frame: false
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);
});

ipcMain.on('quit', () => {
    app.quit();
});