import { app, BrowserWindow, Menu, nativeTheme } from "electron";
import path from "path";

const __dirname = path.resolve();
let win;

function createWindow() {
  nativeTheme.themeSource = "dark";

  win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    title: "Discord Clone",
    frame: true,
    backgroundColor: "#1e1f22",
    autoHideMenuBar: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadURL("http://localhost:3000");

  const menuTemplate = [
    {
      label: "파일",
      submenu: [
        {
          label: "홈",
          click: () => {
            win.webContents.send("navigate", "/");
          },
        },
        {
          label: "새로고침",
          accelerator: process.platform === "darwin" ? "Cmd+R" : "Ctrl+R",
          click: () => {
            win.reload();
          },
        },
        { type: "separator" },
        {
          label: "최소화",
          accelerator: "CmdOrCtrl+M",
          click: () => win.minimize(),
        },
        {
          label: "최대화/복원",
          click: () => {
            if (win.isMaximized()) {
              win.unmaximize();
            } else {
              win.maximize();
            }
          },
        },
        { type: "separator" },
        {
          label: "종료",
          accelerator: process.platform === "darwin" ? "Cmd+Q" : "Ctrl+Q",
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: "채팅",
      submenu: [
        {
          label: "채팅 기록 지우기",
          click: () => {
            win.webContents.send("clear-chat");
          },
        },
      ],
    },
    {
      label: "보기",
      submenu: [
        {
          label: "개발자 도구",
          accelerator:
            process.platform === "darwin" ? "Cmd+Shift+I" : "Ctrl+Shift+I",
          click: () => {
            win.webContents.toggleDevTools();
          },
        },
        { type: "separator" },
        {
          label: "실제 크기",
          accelerator: "CmdOrCtrl+0",
          click: () => {
            win.webContents.setZoomLevel(0);
          },
        },
        {
          label: "확대",
          accelerator: "CmdOrCtrl+Plus",
          click: () => {
            win.webContents.setZoomLevel(win.webContents.getZoomLevel() + 0.5);
          },
        },
        {
          label: "축소",
          accelerator: "CmdOrCtrl+Minus",
          click: () => {
            win.webContents.setZoomLevel(win.webContents.getZoomLevel() - 0.5);
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
}

if (process.platform === "darwin") {
  app.dock.setIcon(path.join(__dirname, "icon.png"));
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
