'use strict'

import { app, BrowserWindow } from 'electron'
import devtools from './devtools'

if (process.env.NODE_ENV === 'development') {
  devtools()
}

app.on('before-quit', () => {
  console.log('Saliendo...')
})

app.on('ready', () => {
  let win = new BrowserWindow({
    width: 900,
    height: 900,
    title: `Hola Mundo`,
    center: true,
    maximizable: true,
    show: false
  })

  win.once('ready-to-show', () => {
    win.show()
  })

  win.on('move', () => {
    const position = win.getPosition()
    console.log('la posicion es : ' + position)
  })

  win.on('closed', () => {
    win = null
    app.quit()
  })

  // win.loadURL('https://proinso.sa.com/flujo/')
  win.loadURL(`file://${__dirname}/renderer/index.html`)
  win.toggleDevTools()
})
