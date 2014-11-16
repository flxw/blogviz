// ---- global vars -----------------------------
var tabStates = {}
var currentTabId = null
var dbLocation = "http://192.168.42.38:8003/WebPlugin/checkHost.xsjs"

// ---- global functions ------------------------
function changeStateIconTo(state) {
  var icon = 'img/icon_' + state + '.png'

  currentTabState = state
  chrome.browserAction.setIcon({path : icon})
}

function acquireTabStateFor(tabId, url) {
  var httpRequest = new XMLHttpRequest()

  httpRequest.open("GET", dbLocation + "?url=" + url, true)
  httpRequest.setRequestHeader('Authorization', 'Basic U01BMTQxNTpQb3Bjb3JuNTQ=')

  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4) {
      if (httpRequest.status == 200) {
        tabStates[tabId].state = 'active'
      } else {
        tabStates[tabId].state = 'inactive'
      }

      if (currentTabId === tabId) {
        changeStateIconTo(tabStates[tabId].state)
      }
    }
  } 

  httpRequest.send(null)
  setTimeout(function () {
  console.log(httpRequest.responseText)}, 3000)
}

// ---- logic, bitches --------------------------
chrome.tabs.onRemoved.addListener(function(removedTabId, removeInfo) {
  if (removedTabId in tabStates) {
    delete tabStates[removedTabId]
  }
})

// every time a different tab gets highlighted, the displayed information
// inside the popup needs to be changed
chrome.tabs.onActivated.addListener(function(changeInfo) {
  currentTabId = changeInfo.tabId
  if (currentTabId in tabStates) {
    changeStateIconTo(tabStates[currentTabId].state)
  } else {
    tabStates[currentTabId] = {
      state : 'inactive'
    }
  }
})


// when the page inside a tab changes, the content scripts
// are re-run as well and thus the state information may need to be updated here
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  
  requestUrl = modifyUrl(request.url)
  if (sender.tab) {
    switch (request.type) {
      case 'setTabUrl':
        acquireTabStateFor(sender.tab.id, requestUrl)
        return true
    }
  }
})

function modifyUrl(url) {
  url = url.replace(/^http?:\/\//,'')
  url = url.replace(/^https?:\/\//,'')
  url = url.substring(0, url.length-1)
  return url
}
