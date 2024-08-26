import { app, shell, BrowserWindow, ipcMain, Tray, Menu } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'

import openIcon from '../../resources/open.png?asset'
import closeIcon from '../../resources/close.png?asset'
import updateIcon from '../../resources/update.png?asset'
import { autoUpdater } from 'electron-updater'

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
        autoUpdater.checkForUpdates()
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
    width: 1386,
    height: 917,
    minWidth: 220,
    minHeight: 356,
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

  //开展更新窗口
  ipcMain.on('openUpdate',() => {
    mainWindow.setSize(1010, 667);
    mainWindow.resizable = false;
    mainWindow.center()
  })

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

  // 创建托盘图标
  createTray(mainWindow)


  //这个得到版本，但不参与任何的版本事件
  ipcMain.on('version-request-Y', (event) => {
    event.reply('version-response-Y', app.getVersion())
  })

  //这个得到版本，会参与任何的版本事件
  ipcMain.on('version-request', (event) => {
    event.reply('version-response', app.getVersion())
  })

  // 监听渲染进程的更新检查请求
  ipcMain.on('check-for-update', () => {
    // 开始检查更新
    autoUpdater.checkForUpdates()
  })

  //监听渲染进程的更新确认
  ipcMain.on('check-for-update-yes', () => {
    // 开始检查更新
    autoUpdater.quitAndInstall()
  })
  // 设置自动更新监听器
  autoUpdater.on('checking-for-update', () => {
    console.log('Checking for update...')
  })

  autoUpdater.on('update-available', (info) => {
    console.log('Update available:', info.version)
  })

  autoUpdater.on('update-not-available', (info) => {
    console.log('Update not available:', info.version)
  })

  autoUpdater.on('error', (err) => {
    console.error('Error in auto-updater:', err)
    //通知渲染线程，更新失败
    BrowserWindow.getAllWindows().forEach((win) => {
      win.webContents.send('update-downloaded-err', err)
    })
  })

  autoUpdater.on('download-progress', (progressObj) => {
    let logMessage = 'Download speed: ' + progressObj.bytesPerSecond
    logMessage = logMessage + ' - Downloaded ' + progressObj.percent + '%'
    logMessage = logMessage + ' (' + progressObj.transferred + '/' + progressObj.total + ')'
    console.log(logMessage)

    //通知渲染线程，更新进度
    BrowserWindow.getAllWindows().forEach((win) => {
      const percentage = (progressObj.transferred/progressObj.total) *100;
      win.webContents.send('download-progress-r', percentage.toFixed(2)
    )
    })
  })


  autoUpdater.on('update-downloaded', (info) => {
    console.log('Update downloaded:', info.version)
    // 通知渲染进程更新已下载
    BrowserWindow.getAllWindows().forEach((win) => {
      win.webContents.send('update-downloaded', info)
    })

  })
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
