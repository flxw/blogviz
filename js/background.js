/*chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type == "pluginState:ready") {
    chrome.browserAction.setIcon({details : 'img/icon_ready.png'}, sender.tab.id)
  }
})*/

var currentTabState = null
var currentTabId    = null

chrome.browserAction.onClicked.addListener(function(tab) {
  if (currentTabState === 'ready') {
      chrome.tabs.sendMessage(currentTabId, { type : "activate"})
  } else if (currentTabState === 'active') {
      chrome.tabs.sendMessage(currentTabId, { type : "deactivate"})
  } else {
    console.log('BlogIntelligence will not be fooled!')
  }
})

// every time the tab changes, we need to check whether the plugin is already
// active here. For any state, the icon needs to be change accordingly
chrome.tabs.onActivated.addListener(function(changeInfo) {

  chrome.tabs.sendMessage(changeInfo.tabId, { type : "getTabState"}, function(response) {
    currentTabId = changeInfo.tabId
    changeStateIconTo(response.state)
  })
})

// when the page inside a tab changes, the above signal is not sent,
// but the main script still gets run. So the main script can trigger
// an icon change by itself as well
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.type) {
    case 'onTabStateChange':
      changeStateIconTo(request.state)
      return true
  }
})

// local functions ------------------------------
function changeStateIconTo(state) {
  var icon = 'img/icon_' + state + '.png'

  currentTabState = state
  chrome.browserAction.setIcon({path : icon})
}