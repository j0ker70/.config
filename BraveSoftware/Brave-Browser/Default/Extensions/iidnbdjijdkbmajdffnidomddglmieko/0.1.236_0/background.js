var loadedScript = false;

function openSidebar() {
  toggleSlider(false);
}

function toggleSlider(toggle) {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    let tab = tabs[0];
		chrome.tabs.executeScript(tab.id, { file: "script.js" }, function() {
      chrome.tabs.sendMessage(
        tab.id,
        { callFunction: "toggleSidebar", toggle: toggle },
        null,
        function(response) {
          let resp = String(JSON.stringify(chrome.runtime.lastError));
          if (resp.length > 0 && chrome.runtime.lastError) {
            let options = {
              type: "basic",
              title: "Webpage doesn't allow Quillbot",
							message: "The quillbot extension doesnt work on this page. Try it on a different website!",
							iconUrl: "assets/icon.png",
            };
            chrome.notifications.create('', options);
          }
        }
      );
		});
	});
}

/*Put page action icon on all tabs*/
chrome.tabs.onUpdated.addListener(function(tabId) {
  chrome.pageAction.show(tabId);
});

chrome.tabs.getSelected(null, function(tab) {
  chrome.pageAction.show(tab.id);
});

/*Send request to current tab when page action is clicked*/
chrome.pageAction.onClicked.addListener(function(tab) {
  toggleSlider(true);
});

chrome.contextMenus.create({
  id: "quill",
  title: "Quill",
  contexts: ["selection"],
  onclick: openSidebar
});
