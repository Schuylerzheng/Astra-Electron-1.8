const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false, // keep this false unless you need Node APIs in-page
    },
  });

  // Point this at your game's html file
  win.loadFile('index.html');

  // Optional: remove the menu bar for a cleaner "app" feel
  win.setMenuBarVisibility(false);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});