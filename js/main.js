// state sollte auf ready gesetzt werden wenn der shit geht
var state = 'ready'

chrome.runtime.sendMessage({type : "onTabStateChange", state : state})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  switch (request.type) {
    case 'getTabState':
      sendResponse({state : state});
      return true;

    case 'activate':
      console.log('BlogIntelligence Insights providing serious insights!')
      activateHeader()
      return true

    case 'deactivate':
      console.log('BlogIntelligence Insights disabled :(')
      return true
    }
})


function activateHeader() {
  // could use $.load() here if we were using zeptojs/jquery
  var topbar  = document.createElement('div')
  var logoUrl = chrome.extension.getURL('img/blogintelligence_logo_white_text.png')

  var barhtml = "<div id='bi-animationArea'></div>"
  barhtml    += "<div id='bi-interactionArea'>"
  barhtml      += "<div id='bi-buttonArea'><ul class='button-group'>"
  barhtml        += "<li><a href='#' class='button selected'>Animation 1</a></li>"
  barhtml        += "<li><a href='#' class='button'>Animation 2</a></li>"
  barhtml      += "</ul></div>"
  barhtml      += "<div id='bi-logoArea'><img src=" + logoUrl + "></div>"
  barhtml    += "</div>"

  topbar.id  = 'bi-barHeader'
  topbar.innerHTML = barhtml

  document.body.insertBefore(topbar, document.body.firstChild);
}
