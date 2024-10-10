// src/electron.d.ts
interface Window {
  electron: {
    sendNotification: (options: { title: string; body: string }) => void;
    // Add other Electron APIs you expose here
  };
}
