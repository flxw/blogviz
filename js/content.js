function reverseDomainName(s) {
  return s.split(".").reverse().join(".")
}

var origin     = reverseDomainName(document.location.origin.replace('http://', '')) + ":http" + document.location.pathname
var state      = 'inactive'
var dbLocation = "http://192.168.42.38:8003/WebPlugin/checkUrl.xsjs"

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.type) {
    case 'getTabState':
      sendResponse({state : state});
      return true;
    case 'setTabState':
      state = request.state
      return true;
  }
})

chrome.runtime.sendMessage({type: 'checkIfContained', url: origin})