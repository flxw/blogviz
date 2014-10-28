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

// every time the tab changes, we need to check whether the plugin is alread
// active here. For any state, the icon needs to be change accordingly
chrome.tabs.onActivated.addListener(function(changeInfo) {

  chrome.tabs.sendMessage(changeInfo.tabId, { type : "getTabState"}, function(response) {
    var icon = 'img/icon_' + response.state + '.png'

    currentTabState = response.state
    currentTabId = changeInfo.tabId

    chrome.browserAction.setIcon({path : icon})
  })
})