// chrome re-renders the popup every time it gets opened
chrome.runtime.sendMessage({type: 'getCurrentTabInformation'}, function(tabData) {
	console.log(tabData)
	$('#dataArea').text(JSON.stringify(tabData))
})