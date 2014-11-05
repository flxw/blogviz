/*chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type == "pluginState:ready") {
    chrome.browserAction.setIcon({details : 'img/icon_ready.png'}, sender.tab.id)
  }
})*/

var currentTabState = null
var currentTabId    = null

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

    case 'checkIfContained':
      request.open("GET", "http://192.168.42.38:8003/WebPlugin/checkUrl.xsjs?url=de.amulette-kelten.www:http/Amulette-der-Kelten-Produktseiten-01/Amulette-der-Kelten-Weise-Goettin-Anhaenger-WJ-P645s.html", true)
      request.setRequestHeader('Authorization', 'Basic U01BMTQxNTpQb3Bjb3JuNTQ=')
      request.onreadystatechange = function() {
        if (request.readyState == 4) {
          if (request.status == 200) {
            console.log('Website inside the database!')
            state = 'ready'
            chrome.runtime.sendMessage({type : "onTabStateChange", state : state})
          } else {
            console.log('Website is not inside!')
          }
        }
      }
      request.send();
      return true;
  }
})

// local functions ------------------------------
function changeStateIconTo(state) {
  var icon = 'img/icon_' + state + '.png'

  currentTabState = state
  chrome.browserAction.setIcon({path : icon})
}