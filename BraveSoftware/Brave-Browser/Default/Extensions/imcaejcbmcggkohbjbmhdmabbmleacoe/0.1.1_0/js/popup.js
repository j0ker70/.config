'use strict';

var saveConfig = document.getElementById('saveConfig');
var friendName = document.getElementById('friendName');
var botEnabled = document.getElementById('botEnabled');

var savedText = document.createElement('span');
savedText.setAttribute('id', 'savedText');
savedText.innerText = 'Settings saved!';

chrome.storage.sync.get(['friendName', 'reconnectDelay', 'botEnabled'], function(data) {
  friendName.value = data.friendName;
  reconnectDelay.value = data.reconnectDelay;
  botEnabled.checked = data.botEnabled;
});

saveConfig.onclick = function(element) {
    var name = friendName.value;
    var delay = reconnectDelay.value;
    var enabled = botEnabled.checked;
    chrome.storage.sync.set({'friendName': name, 'reconnectDelay': delay, 'botEnabled': enabled}, function(){
        if(!document.getElementById('stuffSaved')) {
            document.getElementById('menuFrame').appendChild(savedText);
            chrome.runtime.sendMessage(null, {'updateUI': true});
        }
    });
    chrome.tabs.query({'active': true, 'url': 'https://*.skribbl.io/*'}, function (tabs) {
        if(tabs.length > 0) {
            chrome.tabs.reload(tabs[0].id, null, function() {
                //page reloaded
            });
        }
    });
};
