chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({'friendName': 'player name', 'reconnectDelay': 1250, 'botEnabled': false}, function(){
        //initial save completed
    });
    updateUIEnabled();
});

chrome.runtime.onStartup.addListener(function() {
    updateUIEnabled();
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.updateUI) updateUIEnabled();
});

function updateUIEnabled() {
    chrome.storage.sync.get(['botEnabled'], function(data) {
        if(data.botEnabled) {
            chrome.browserAction.setBadgeBackgroundColor({ color: '#4cae4c'});
            chrome.browserAction.setBadgeText({text:'✓'});
        }else{
            chrome.browserAction.setBadgeBackgroundColor({ color: '#f9615c'});
            chrome.browserAction.setBadgeText({text:'□'});
        }
    });
}