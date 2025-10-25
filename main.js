const { app, BrowserWindow } = require('electron/main')
const path = require('path' )

// Put Electron profile (userData) in a Local AppData subfolder to avoid
// OneDrive or Roaming-folder permission/locking issues that can produce
// "Unable to move the cache: Access is denied" and quota DB errors on Windows.
// This must be called before the app 'ready' event.
try {
  const localAppData = process.env.LOCALAPPDATA || app.getPath('userData')
  // Use a clearly named folder to avoid clobbering other apps
  app.setPath('userData', path.join(localAppData, 'Eagler_1.8_user_data'))
} catch (err) {
  // If setting fails, log a warning and continue; default path will be used
  // (The warning will appear in the terminal where you run `npm start`.)
  // eslint-disable-next-line no-console
  console.warn('Warning: failed to set userData path:', err && err.message ? err.message : err)
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  // Use an explicit absolute path so the file is found regardless of cwd
  win.loadFile(path.join(__dirname, 'index.html'))
  // Open DevTools automatically to capture renderer errors while debugging
  // Remove or disable in production.
  // I DON'T KNOW HOW TO MAKE IT PRODUCTION
  // if (process.env.NODE_ENV !== 'production') {
  //   win.webContents.openDevTools({ mode: 'right' })
  // }
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})