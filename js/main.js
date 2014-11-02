// state sollte auf ready gesetzt werden wenn der shit geht
var state = 'inactive'

if (Math.random() > 0.5) {
  state = 'ready';
}

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

// check if webpage is contained inside BlogIntelligence database
function activateHeader() {
  header = window.document.createElement('div');
  header.style.position = 'fixed';
  header.style.top = "0";
  header.style.width = "100%";
  header.style.backgroundColor = 'red';
  header.style.zIndex = "9999";
  header.innerHTML = "HELLO WORLD"; // your content

  wrapper = window.document.createElement('div');
  wrapper.style.position = 'relative';
  wrapper.style.marginTop = '15px'; // set to same height as header
  wrapper.innerHTML = document.body.innerHTML;

  document.body.innerHTML = "";
  document.body.appendChild(header);
  document.body.appendChild(wrapper);
}