////////////////////////////////////////////////////////////////////////////
// Import of Electron
const electron = require('electron');
const { ipcRenderer } = electron;

document.querySelector('form').addEventListener('submit', function(event){
    event.preventDefault();

    const inputValue = document.querySelector('input').value;

    if (inputValue >= 12 && inputValue <= 100){
        ipcRenderer.send('saveOptions', inputValue);
    } else {
        alert('Score must be between 12 and 100!!!');
    }
 
});