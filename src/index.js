const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;
let optionsWindow;

////////////////////////////////////////////////////////////////////////////////////
// Main Window
app.on('ready', ()=>{
    mainWindow = new BrowserWindow({
        width: 1100, 
        height: 650,
        resizable: false,
        frame: false,
        show: false
    });
    mainWindow.loadURL(`file://${__dirname}/index.html`);

    mainWindow.once('ready-to-show', () => { 
        mainWindow.show(); 
    });
});

ipcMain.on('quit', () => {
    app.quit();
});


/////////////////////////////////////////////////////////////////////////////////////
// Options Window
ipcMain.on('saveOptions', (event, inputValue) => {
    mainWindow.webContents.send('setOptions', inputValue);

    optionsWindow.close();
});

ipcMain.on('options', () => {
    openOptionsWindow();
});

function openOptionsWindow(){
    optionsWindow = new BrowserWindow({
        width: 300,
        height: 180,
        resizable: false,
        show: false,
        parent: mainWindow,
        modal: true,
        frame: false,
    });
    optionsWindow.loadURL(`file://${__dirname}/pages/options.html`);

    optionsWindow.once('ready-to-show', () => { 
        optionsWindow.show(); 
    });

    optionsWindow.on('closed', () => optionsWindow = null );
}