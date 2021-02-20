/**
 * this is a contextscript, it is loaded to run on the page that will show the sidebar
 */

//only load the script the first time the button or context menu is clicked

// For Prod
const iframeURL = "https://quillbot.com/extension";
// For Testing
// const iframeURL = "https://demo.quillbot.dev/extension";
// For Development
// const iframeURL = "http://localhost:3000/extension";

var quillLoaded = false;
var iframe = null;
if (!window.addedQuillbotExtension) {
  //console.log("once")
  window.addEventListener("message", function (event) {
    if (iframeURL.includes(event.origin)) {
      // console.log("Inside the if after event.origin check");
      var data = event.data;
      if (data.method === "loadExtension") {
        // console.log("Making the quillLoaded as true");
        // sending blank event to set url in data
        const myframe = document.getElementById("quillbot-extension-iframe");
        myframe.contentWindow.postMessage(
          {
            method: "setChromeHostUrl",
          },
          "*"
        );
        quillLoaded = true;
      } else if (data.method === "finSetText") {
        var myframe = document.getElementById("quillbot-extension-iframe");
        myframe.contentWindow.postMessage(
          {
            method: "quillInput",
          },
          "*"
        );
      }
    } else {
      // console.log("Event.origin check failed for origin- ", event.origin);
    }
  });

  var quillInputText = (text) => {
    if (!quillLoaded) {
      console.log("Will retry sending text");
      return setTimeout(quillInputText.bind(this, text), 500);
    }
    // console.log("sending.......");
    var myframe = document.getElementById("quillbot-extension-iframe");
    myframe.contentWindow.postMessage(
      {
        method: "setInputText",
        text: text,
      },
      "*"
    );
  };

  let loadedEmbed = false;
  var url = chrome.runtime.getURL("frame.html"); //"https://quillbot.com/?extension"

  //http://code.google.com/chrome/extensions/messaging.html
  chrome.runtime.onMessage.addListener(function (
    request,
    sender,
    sendResponse
  ) {
    //console.log(request, sender, sendResponse)
    if (request.callFunction == "toggleSidebar") {
      toggleSidebar(request.toggle);
    }
    sendResponse({
      farewell: "goodbye",
    });
  });

  /*Small function wich create a sidebar(just to illustrate my point)*/
  var sidebarOpen = false;
  var loaded = false;
  var sidebarWidth = 450;
  var lastSelection = "";

  function toggleSidebar(toggle) {
    var sidebar = null;
    var selection = window.getSelection().toString();
    if (!loaded) {
      loaded = true;
      sidebar = document.createElement("div");
      sidebar.id = "quillbot-extension-sidebar";
      sidebar.style.position = "absolute";
      sidebar.style.boxShadow = "2px 1px 12px #000000b3";
      sidebar.style.display = "flex";
      sidebar.style.flexDirection = "column";
      document.body.appendChild(sidebar);

      var closeBtn = document.createElement("div");
      closeBtn.style.padding = "0px 6px 2px";
      closeBtn.style.lineHeight = "1em";
      closeBtn.style.cursor = "pointer";
      closeBtn.style.position = "absolute";
      closeBtn.style.background = "#e0d9d9";
      closeBtn.style.fontFamily = "monospace";
      closeBtn.style.fontSize = "20px";
      closeBtn.style.color = "#555";
      closeBtn.innerHTML = `x`;
      // closeBtn.innerHTML = `<img src='./assets/close.png' />`;
      closeBtn.addEventListener("mouseover", () => {
        closeBtn.style.background = "rgb(224, 151, 151)";
      });
      closeBtn.addEventListener("mouseout", () => {
        closeBtn.style.background = "#e0d9d9";
      });
      closeBtn.onclick = toggleSidebar.bind(true);
      sidebar.appendChild(closeBtn);

      iframe = document.createElement("iframe");
      iframe.src = iframeURL; //url; //url;canUseIframe()?chrome.runtime.getURL('frame.html'):
      iframe.scorlling = "no";
      iframe.width = sidebarWidth - 2;
      sidebar.style.position = "relative";
      iframe.style.height = "100vh";
      iframe.style.border = "none";
      iframe.style.marginLeft = "2px";
      iframe.style.paddingTop = "5px";
      iframe.id = "quillbot-extension-iframe";
      sidebar.appendChild(iframe);

      sidebar.style.cssText = `
				position:fixed;
				top:0px;
				right:0px;
				width:0px;
				height:100%;
				background: #eee;
				z-index:999999;
				transition: all .35s;
				box-shadow: 2px 1px 12px #000000b3;
			`;
    } else {
      //console.log("redo2")
      sidebar = document.getElementById("quillbot-extension-sidebar");
      iframe = null; //document.getElementById('quillbot-extension-iframe');
    }

    if (selection.length > 0 && selection !== lastSelection) {
      if (!toggle) {
        quillInputText(selection);
      }
    }

    if (toggle) {
      sidebarOpen = !sidebarOpen;
    } else {
      sidebarOpen = true;
    }

    if (!sidebarOpen) {
      sidebar.style.width = "0px";
    } else {
      sidebar.style.width = sidebarWidth + "px";
    }
  }

  window.addedQuillbotExtension = true;
} else {
  //console.log("redo1")
}

/**
 * reloads the iframe
 *
 * @param {HTMLElement} iFrame
 */
function reloadFrame(iFrame) {
  iFrame.parentNode.replaceChild(iFrame.cloneNode(), iFrame);
}
