'use strict';

window.onload = bot;

var name;
var reconnectDelay;

var found = false;
var playerList;

function bot() {
    chrome.storage.sync.get(['friendName', 'reconnectDelay', 'botEnabled'], function(data) {
        if(data.botEnabled) {
        name = data.friendName;
        reconnectDelay = data.reconnectDelay;
        waitForGame();
        }
    });
}

function waitForGame() {
    var button = document.getElementById('formLogin').getElementsByClassName('btn')[0];
    button.click();

    var intervalId = setInterval(function() {
        if(document.getElementById('containerGamePlayers')) {
            playerList = document.getElementById('containerGamePlayers');
            if(playerList.childElementCount > 0) {
                checkForName();
                clearInterval(intervalId);
            }
        }
    }, 10);
}

function checkForName() {
    for(var i = 0; i < playerList.childElementCount; ++i) {
        var disName = playerList.childNodes[i].childNodes[1].childNodes[0].innerHTML;
        if(disName.trim().toLowerCase() === name.trim().toLowerCase()) found = true;
    }
    if(!found) {
        setTimeout(function() {window.location.reload();}, reconnectDelay);
    }
}