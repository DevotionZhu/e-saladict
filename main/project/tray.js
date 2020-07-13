const { Tray, Menu, BrowserWindow } = require('electron');
const { resolve: pathResolve } = require('path');
const { showWindow } = require('./show-window');
const { quit } = require('./quit');
const { instance } = require('./instance');

const menuTemplate = [
  {
    label: '打开 Saladict',
    type: 'normal',
    click: () => {
      showWindow();
    },
  },
  {
    label: '退出',
    type: 'normal',
    click: () => {
      quit();
    },
  },
];

const menu = Menu.buildFromTemplate(menuTemplate);

function addTray() {
  console.info('addTray');
  const tray = new Tray(pathResolve(__dirname, '../assets/tray.png'));

  tray.on('click', () => {
    const isVisible = !!(
      instance.win &&
      instance.win.isVisible() &&
      BrowserWindow.getFocusedWindow()
    );

    console.info('isVisible: ', isVisible);

    if (isVisible) {
      tray.popUpContextMenu(menu);
    } else {
      showWindow();
    }
  });

  instance.tray = tray;
}

module.exports = { addTray };
