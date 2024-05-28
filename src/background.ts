export {}

chrome.action.onClicked.addListener((tab) => {
  if (tab.id !== undefined) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['contentScript.js'],
    });
  } else {
    console.error('Error: tab.id is undefined');
  }
});
