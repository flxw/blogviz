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
request.send()


console.log(origin + ":http" + document.location.pathname)