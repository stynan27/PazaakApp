'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer';

const path = require("path");
const { fork } = require("child_process");

const isDevelopment = true; // process.env.NODE_ENV !== 'production'
let wsServerPID = null;
let win = null

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1920,
    height: 1080,
    icon: path.join(__dirname, '../public/favicon.ico'), // starts from dist_electron
    webPreferences: {
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

async function closeServerConnection() {
  if (wsServerPID) {
    console.log('Closing WS server connection');
    await process.kill(wsServerPID);
  } else {
    // TODO: handle peer disconnection??
  }
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
  closeServerConnection();
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})

// start WS server
ipcMain.on('connection:host', () => {
  console.log('Starting Websocket server');
  const serverPath = path.join(__dirname, '../server/server.js');
  const wsServer = fork(serverPath);
  
  wsServerPID = wsServer['pid'];
  console.log('PID', wsServerPID);

  wsServer.on('message', (m) => {
    console.log('WS SERVER HEARTBEAT', m.counter);
    // if (m.counter === 1) {
    //   win.webContents.send('server:running', 'Server Started');
    // }
  });

  wsServer.on('error', (err) => {
    console.error('Server terminated with error', err);
  });

  wsServer.on('exit', (code) => {
    console.log('Server exited with code', code);
  });
});

// handle manual WS server exit
ipcMain.on('connection:close', () => {
  closeServerConnection();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
