// chrome re-renders the popup every time it gets opened
chrome.runtime.sendMessage({type: 'getCurrentTabInformation'}, function(tabData) {
  console.log(tabData)
  $('#postCount').text(tabData.postCount)

  var categories = []

  for (tag in tabData.tags) {
    categories.push($('<span>' + tabData.tags[tag] + '</span>'))
  }

  $('#categoryContainer p').append(categories)
})