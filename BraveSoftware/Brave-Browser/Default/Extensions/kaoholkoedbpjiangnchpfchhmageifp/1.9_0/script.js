var isBackground = false;
var debug = false;
var disconnectCount = 0;
var otherConnect = false;

setInterval(function() {
	if(anotherConnection()) {
		if(!otherConnect) {
			otherConnect = true;
			alert(chrome.i18n.getMessage("otherAlert"));
			chrome.runtime.sendMessage({ name: "anotherConnection" });
		}
	} else if(isDisconnect()) {
		disconnectCount++;

		if(disconnectCount == 60) {
			disconnectCount = 0;
			document.location.reload();
		}

		chrome.runtime.sendMessage({ name: "isDisconnect" });
	} else {
		otherConnect = false;

		disconnectCount = 0;

		var chatList = document.getElementsByClassName('chatlist');
		if(chatList != undefined && chatList.length > 0) {
			var title = document.getElementsByTagName("TITLE");
			title = title[0].innerHTML;
			var tuN = title.replace(/[^0-9]+/g, '');
			chrome.runtime.sendMessage({ name: "updateTotalChats", totalChat: tuN });
		}
	}

	chrome.runtime.sendMessage({ name: "backgroundRunning" }, function (backgroundRunning) {
		isBackground = backgroundRunning;
	});
}, 1000);

function anotherConnection() {
	if(debug) console.log("Another connection detected");

	var chatList = document.getElementsByClassName('chatlist');
	if(chatList == undefined || chatList.length == 0) {
		var popupContainer = document.getElementsByClassName('popup-container');
		if(popupContainer != undefined && popupContainer.length > 0) {
			var popupTitle = document.getElementsByClassName('popup-title');
			if(!(popupTitle != undefined && popupTitle.length > 0)) {
				return true;
			}
		}
	}
	return false;
}

function isDisconnect() {
	if(debug) console.log("Checking if is disconnected");

	var chatList = document.getElementsByClassName('chatlist');
	if(chatList == undefined || chatList.length == 0) {
		var popupContainer = document.getElementsByClassName('popup-container');
		if(popupContainer != undefined && popupContainer.length > 0) {
			return true;
		}
	} else {
		var alertMessage = document.getElementsByClassName('icon-alert-phone');
		if(alertMessage != undefined && alertMessage.length > 0) {
			return true;
		}
	}
	return false;
}

setTimeout(function() {
	notificationBlocker();
}, 2000);


function notificationBlocker() {
	if(!isBackground) {
		return;	
	}

	var script = "(" + function () {
		var OriginNotif = window.Notification;
		var DumbNotification = function (title, options) {
			var notif = new OriginNotif(title, options);
			notif.onshow = function () {
				notif.close();
			};
		};

		window.Notification = DumbNotification;
	} + ")();";

	var scriptElem = document.createElement("script");
	scriptElem.innerHTML = script;
	document.head.appendChild(scriptElem);
}