// WhatsApp Web Notifier 1.0
// Copyright 2015 Social Apps

var simpleDomain = "web.whatsapp.com";
var url = "https://" + simpleDomain + "/";
var openTabs = [];
var updateInterval;
var backgroundRunning = false;
var firstOpen = true;
var debug = false;

chrome.webRequest.onHeadersReceived.addListener(
    function(info) {
        var headers = info.responseHeaders;
        for (var i=headers.length-1; i>=0; i--) {
            var header = headers[i].name.toLowerCase();
            if (header == 'x-frame-options' || header == 'frame-options') {
                headers.splice(i, 1);
            }
        }
        return {responseHeaders: headers};
    },
    {
        urls: [ '*://*.whatsapp.com/*' ],
        types: [ 'main_frame', 'sub_frame' ]
    },
    ['blocking', 'responseHeaders']
);

chrome.runtime.onInstalled.addListener(function (details) {
	if(details.reason == "install"){
		if(debug) console.log('INSTALLED');

		openTab();
	}
});

chrome.browserAction.onClicked.addListener(function(newTab) {
	if(debug) console.log('BUTTON CLICKED');

	openTab();
});

chrome.tabs.onUpdated.addListener(function (tabId, info, tab) {
	if(isWhatsappTab(info.url)) {
		if(debug) console.log('WHATSAPP TAB UPDATED');

		closeBackground();

		if(openTabs.length > 0) {
			closeOpenTabsBut(tabId);
		} else if(!backgroundRunning) {
			chrome.browserAction.setBadgeText({text: '...'});
			chrome.browserAction.setBadgeBackgroundColor({ color: [180, 180, 180, 20] });
		}

		openTabs[tabId] = info.url;
		updateStates();
	} else if(openTabs.length == 0) {
		openBackground();
	}
});

chrome.tabs.onRemoved.addListener(function (tabId, info)
{
	if(isWhatsappTab(openTabs[tabId])) {
		openBackground();

		openTabs.splice(tabId, 1);
	}
});

chrome.runtime.onMessage.addListener(function(message, sender, callback) {
	if(message.name == 'updateTotalChats') {
		var tuN = message.totalChat;
		if(tuN.length == 0) {
			chrome.browserAction.setBadgeText({text: ''});
			chrome.browserAction.setBadgeBackgroundColor({ color: [46, 138, 191, 255] });
		} else if(!isNaN(tuN) && tuN > 0) {
			chrome.browserAction.setBadgeText({text: tuN});
			chrome.browserAction.setBadgeBackgroundColor({ color: [46, 138, 191, 255] });
		}
	} else if(message.name == 'isDisconnect') {
		chrome.browserAction.setBadgeText({text: '!'});
		chrome.browserAction.setBadgeBackgroundColor({ color: [255, 120, 0, 80] });
	} else if(message.name == 'backgroundRunning') {
		callback(backgroundRunning);
	} else if(message.name == 'anotherConnection') {
		clearInterval(updateInterval);
		updateInterval = null;

		chrome.browserAction.setBadgeText({text: 'x'});
		chrome.browserAction.setBadgeBackgroundColor({ color: [200, 80, 10, 120] });
	}
});

function openTab() {
	closeBackground();

	doIfAllClosed(function() {
		chrome.tabs.create({url: url});
	}, function() {
		for(id in openTabs) {
			chrome.tabs.update(parseInt(id), { highlighted : true });
			break;
		}
	});

	firstOpen = false;
}

function closeOpenTabsBut(exceptionTabId) {
	for(id in openTabs) {
		if(id != exceptionTabId) {
			try {
				chrome.tabs.remove(parseInt(id));
			} catch(e) {
				// Tab was already closed
			}
		}
	}

	openTabs = [];
}

function openBackground() {
	doIfAllClosed(function() {
		document.body.innerHTML = "<iframe id='whatsappBg' width='1000' height='10000' src='" + url + "'></iframe>";
		backgroundRunning = true;
	});

	firstOpen = false;
}

function closeBackground() {
	if(debug) console.log('CLOSING BACKGROUND: ' + backgroundRunning);

	if(backgroundRunning) {
		document.body.innerHTML = "";
		backgroundRunning = false;
	}
}

function isWhatsappTab(tabUrl) {
	if(tabUrl != undefined && tabUrl.indexOf(simpleDomain) > -1) {
		return true;
	}
	return false;
}

function doIfAllClosed(callback, elseCallback) {
	chrome.tabs.query({ url: url + "*" }, function (tabs) {
		if(tabs.length == 0) {
			callback();
		} else {
			if(elseCallback != undefined) {
				elseCallback();
			}
		}
	});
}

function updateStates() {
	clearInterval(updateInterval);
	updateInterval = null;

	updateInterval = setInterval(function() {
		if(!backgroundRunning) {
			chrome.tabs.query({ url: url + "*" }, function (tabs) {
				if(tabs.length == 0) {
					clearInterval(updateInterval);
					updateInterval = null;
					return;
				}

				if(tabs.length == 1) {
					var tab = tabs[0];

					var tabTitle = tab.title;
					var tabURL = tab.url;
					var tabFavicon = tab.favIconUrl;
					var patt = /\d+/;
								
					if(patt.test(tabTitle)) {
						var tuN = tabTitle.replace(/[^0-9]+/g, '');
						chrome.browserAction.setBadgeText({text: tuN});
						chrome.browserAction.setBadgeBackgroundColor({ color: [46, 138, 191, 255] });
					} else if(tabFavicon != undefined && tabFavicon.indexOf('error') >= 0) {
						chrome.browserAction.setBadgeText({text: '!'});
						chrome.browserAction.setBadgeBackgroundColor({ color: [255, 120, 0, 80] });
					} else {
						chrome.browserAction.setBadgeText({text: ''});
						chrome.browserAction.setBadgeBackgroundColor({ color: [46, 138, 191, 255] });
					}
				}
			});
		}
	}, 1000);
}