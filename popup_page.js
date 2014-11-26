// chrome re-renders the popup every time it gets opened
chrome.runtime.sendMessage({type: 'getCurrentTabInformation'}, function(tabData) {
  $('#postCount').text(tabData.postCount)
  $('#similarPageCount').text(tabData.relatedHosts.length)

  var categoryContainer = $('#categoryContainer p')

  for (tag in tabData.tags) {
    categoryContainer.append('<span>' + tabData.tags[tag] + '</span>')
  }
})