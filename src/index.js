const electron = require('electron');
const { app, BrowserWindow, ipcMain } = electron;

let mainWindow;
let optionsWindow;

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

ipcMain.on('options', () => {
    openOptionsWindow();
});

/*ipcMain.on('hahahahhah', () => {
    //Herere

    console.log('Checked!!!');

    optionsWindow.close();
});*/

function openOptionsWindow(){
    optionsWindow = new BrowserWindow({
        width: 300,
        height: 150,
        resizable: false,
        show: false,
        parent: mainWindow,
        modal: true,
        //frame: false,
    });
    optionsWindow.loadURL(`file://${__dirname}/pages/options.html`);

    optionsWindow.once('ready-to-show', () => { 
        optionsWindow.show(); 
    });

    optionsWindow.on('closed', () => optionsWindow = null );
}