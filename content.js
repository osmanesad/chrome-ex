let lastImageUrl = null;

document.addEventListener("contextmenu", (event) => {
  const el = event.target;

  // <img src="..."> gibi normal görsel
  if (el.tagName === "IMG") {
    lastImageUrl = el.src;
  }

  // background-image içeren element
  const bg = window.getComputedStyle(el).getPropertyValue("background-image");
  const match = bg.match(/url\(["']?(.*?)["']?\)/);

  if (match && match[1]) {
    lastImageUrl = match[1];
  }
});

chrome.runtime.onMessage.addListener(async (req, sender, sendResponse) => {
  if (req.type === "getLastImageUrl") {
    if (lastImageUrl && lastImageUrl.startsWith("blob:")) {
      try {
        const blob = await fetch(lastImageUrl).then(res => res.blob());
        const reader = new FileReader();

        reader.onloadend = () => {
          sendResponse({
            isBlob: true,
            dataUrl: reader.result
          });
        };

        reader.readAsDataURL(blob);

        return true; // 🔥 bu satır çok önemli: asenkron olduğunu Chrome'a bildiriyor
      } catch (e) {
        console.error("Blob fetch hatası:", e);
        sendResponse({ error: true });
        return false;
      }
    } else {
      sendResponse({
        isBlob: false,
        url: lastImageUrl
      });
    }
  }
});
