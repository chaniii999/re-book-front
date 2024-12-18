const { contextBridge, ipcRenderer } = require("electron");

// Electron 메인 프로세스에서 navigate 이벤트를 받을 수 있도록 노출
contextBridge.exposeInMainWorld("electron", {
  // navigate 이벤트를 React 컴포넌트에서 받을 수 있도록 처리
  navigate: (callback) => {
    ipcRenderer.on("navigate", (event, path) => {
      callback(path); // React 쪽으로 경로 전달
    });
  },

  // 다른 필요 시 기능들을 추가할 수 있습니다.
});
