// ---- global vars -----------------------------
var tabStates = {}
var currentTabId = null
var dbLocation = 'http://192.168.42.38:8003/WebPlugin'
var checkHostEndpoint = '/checkHost.xsjs'
var checkPostEndpoint = '/checkPostUrl.xsjs'

// ---- global functions ------------------------
// helpers
function changeStateIconTo(state) {
  var icon = 'img/icon_' + state + '.png'

  currentTabState = state
  chrome.browserAction.setIcon({path : icon})
}

function initializeTabDatastoreFor(tId) {
  tabStates[tId] = {
    type: null,
    state: 'inactive',
    tags : [],
    postCount : null
  }
}

function sendGetRequestTo(endpoint, callback) {
  var httpRequest = new XMLHttpRequest()

  httpRequest.open("GET", dbLocation + endpoint, true)
  httpRequest.setRequestHeader('Authorization', 'Basic U01BMTQxNTpQb3Bjb3JuNTQ=')

  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4) {
      var responseObject = null

      if (httpRequest.responseText) {
        responseObject = JSON.parse(httpRequest.responseText)
      }

      callback(httpRequest.status, responseObject)
    }
  }

  httpRequest.send()
}

function getPostDetailsFor(tabId, url) {
  sendGetRequestTo(checkPostEndpoint + '?url=' + url, function(status, jsonResponse) {
    if (status === 200) {
      tabStates[tabId].state     = 'active'
      tabStates[tabId].type      = 'post'
      tabStates[tabId].tags      = jsonResponse.tags
      tabStates[tabId].postCount = jsonResponse.postCount
    } else {
      tabStates[tabId].state = 'inactive'
    }

    if (currentTabId === tabId) {
      changeStateIconTo(tabStates[tabId].state)
    }
  })
}

function getHostDetailsFor(tabId, url) {
  sendGetRequestTo(checkHostEndpoint + '?url=' + url, function(status, jsonResponse) {
    if (status === 200) {
      tabStates[tabId].state     = 'active'
      tabStates[tabId].type      = 'page'
      tabStates[tabId].tags      = jsonResponse.tags
      tabStates[tabId].postCount = jsonResponse.postCount
    } else {
      tabStates[tabId].state = 'inactive'
    }

    if (currentTabId === tabId) {
      changeStateIconTo(tabStates[tabId].state)
    }
  })
}

function isBaseUrl(url) {
  url = url.replace(/^.*:\/\//,'')

  lastSlashIndex = url.indexOf('/')

  return lastSlashIndex < 0
}

// important
function acquireTabStateFor(tabId, url) {
  if (!(tabId in tabStates)) {
    // sometimes the tab id changes and there is an error
    // finding out why could be useful - this is a quick fix until now
    initializeTabDatastoreFor(tabId)
  }

  if (url[url.length-1] === '/') {
    url = url.substring(0, url.length-1)
  }

  if (isBaseUrl(url)) {
    getHostDetailsFor(tabId, url)
  } else {
    getPostDetailsFor(tabId, url)
  }
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
    console.log(currentTabId + ' is not registered!!')
    changeStateIconTo('inactive')
  }
})


// when the page inside a tab changes, the content scripts
// are re-run as well and thus the state information may need to be updated here
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (sender.tab) {
    switch(request.type) {
      case 'setTabUrl':
        acquireTabStateFor(sender.tab.id, request.url)
        return true
    }
  } else {
    // request comes from the popup
    switch(request.type) {
      case 'getCurrentTabInformation':
        sendResponse(tabStates[currentTabId])
        return true
    }
  }
})
