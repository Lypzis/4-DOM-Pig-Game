const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;
let optionsWindow;

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

ipcMain.on('options', () => {
    optionsWindow = new BrowserWindow({
        width: 300,
        height: 150,
        resizable: false,
    });
    optionsWindow.loadURL(`file://${__dirname}/pages/options.html`);

    optionsWindow.on('closed', () => optionsWindow = null );
});