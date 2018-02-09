const electron = require('electron');
const { app, BrowserWindow } = electron;

let mainWindow;

app.on('ready', ()=>{
    mainWindow = new BrowserWindow({
        width: 1100, 
        height: 650,
        resizable: false
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    mainWindow.on('close', () => app.quit );

    mainWindow.on('closed', () => {mainWindow = null});
});