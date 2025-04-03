chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "quickSaveImage",
    title: "Görseli Hızlı Kaydet",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  chrome.tabs.sendMessage(tab.id, { type: "getLastImageUrl" }, (response) => {
    if (!response) {
      console.error("Görsel alınamadı.");
      return;
    }

    if (response.error) {
      console.error("Blob verisi alınamadı.");
      return;
    }

    if (response.isBlob) {
      // base64 veriyi indir
      const url = response.dataUrl;
      chrome.downloads.download({
        url,
        filename: "blob-goruntu-" + Date.now() + ".png",
        saveAs: false
      });
    } else if (response.url) {
      chrome.downloads.download({
        url: response.url,
        filename: "goruntu-" + Date.now() + ".jpg",
        saveAs: false
      });
    }
  });
});
