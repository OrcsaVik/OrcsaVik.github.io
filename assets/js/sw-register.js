if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
        .then(() => console.log("✅ Service Worker 注册成功"))
        .catch(err => console.error("❌ 注册失败:", err));
}