import { app, shell, BrowserWindow, ipcMain, Tray, Menu, autoUpdater } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

import openIcon from '../../resources/open.png?asset'
import closeIcon from '../../resources/close.png?asset'
import updateIcon from '../../resources/update.png?asset'

let tray: Tray | null = null

function createTray(mainWindow: BrowserWindow): void {
  // 创建托盘图标
  tray = new Tray(icon)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '打开应用',
      click: () => {
        if (!mainWindow.isVisible()) {
          mainWindow.show()
        }
      },
      icon: openIcon
    },
    {
      label: '关闭应用',
      click: () => {
        app.quit()
      },
      icon: closeIcon
    },
    {
      label: '版本更新',
      click: () => {
        // 实现版本更新的逻辑
        shell.openExternal('https://space.bilibili.com/393402835?spm_id_from=333.1007.0.0')
      },
      icon: updateIcon
    }
  ])

  tray.setToolTip('Your App Name')
  tray.setContextMenu(contextMenu)
}

function createWindow(): void {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1495,
    height: 888,
    minWidth: 1010,
    minHeight: 667,
    show: false,
    frame: false,
    resizable: true,
    transparent: true,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      webSecurity: false,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  ipcMain.on('closeWin', () => {
    mainWindow.destroy()
  })
  ipcMain.on('MaxWin', () => {
    mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize()
  })
  ipcMain.on('MinWin', () => {
    mainWindow.minimize()
  })

  ipcMain.on('OpenExternal', (_event, arg) => {
    shell.openExternal(arg)
  })

  //执行更新
  ipcMain.on('check-for-update', () => {
    checkForUpdates()
  })


  ipcMain.on('version-request', (event) => {
    event.reply('version-response', app.getVersion())
  })
  // 创建托盘图标
  createTray(mainWindow)
}

// 替换为你的更新配置文件URL
// 初始化 autoUpdater
autoUpdater.setFeedURL({ url: 'https://your-repo-url.com/latest.yml' })

// 更新事件监听
autoUpdater.on('update-available', () => {
  console.log('Update available.')
})

autoUpdater.on('update-not-available', () => {
  console.log('Update not available.')
})


autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

function checkForUpdates() {
  autoUpdater.checkForUpdates()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  createWindow()

  app.on('activate', function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
