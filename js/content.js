function reverseDomainName(s) {
  return s.split(".").reverse().join(".")
}

var origin     = reverseDomainName(document.location.origin.replace('http://', ''))
var state      = 'inactive'
var request    = new XMLHttpRequest()
var dbLocation = "http://192.168.42.38:8003/WebPlugin/checkUrl.xsjs"

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.type) {
    case 'getTabState':
      sendResponse({state : state});
      return true;
    }
})

chrome.runtime.sendMessage({type: 'checkIfContained'}))


console.log(origin + ":http" + document.location.pathname)