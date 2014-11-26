// chrome re-renders the popup every time it gets opened
chrome.runtime.sendMessage({type: 'getCurrentTabInformation'}, function(tabData) {
  console.log(tabData)
  $('#postCount').text(tabData.postCount)

  var categoryContainer = $('#categoryContainer p')

  for (tag in tabData.tags) {
    categoryContainer.append('<span>' + tabData.tags[tag] + '</span>')
  }
})