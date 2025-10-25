const { app, BrowserWindow } = require('electron/main')
const path = require('path' )

// Put Electron profile (userData) in AppData\Roaming\eagler_1.8 as requested.
// NOTE: This must be called before the app 'ready' event so Chromium uses
// this path for its profile, caches and databases.
try {
  // Prefer the APPDATA env var (Roaming) and fall back to app.getPath('appData')
  const roaming = process.env.APPDATA || app.getPath('appData')
  app.setPath('userData', path.join(roaming, 'eagler_1.8'))
  // Print the resolved path so you can verify it when you run `npm start`.
  // eslint-disable-next-line no-console
  console.log('Electron userData path set to:', app.getPath('userData'))
} catch (err) {
  // If setting fails, log a warning and continue; Electron will use the default
  // location. The warning will appear in the terminal where you run `npm start`.
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