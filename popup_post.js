// chrome re-renders the popup every time it gets opened
chrome.runtime.sendMessage({type: 'getCurrentTabInformation'}, function(tabData) {
    var categoryContainer = $('#categoryContainer p')
    var relatedPostContainer = $('#relatedPostContainer p')
/*
    for (tag in tabData.tags) {
     //   var relatedPost = tabData.relatedPosts[tag]
      categoryContainer.append('<span>' + tabData.tags[tag] + '</span>')
   //   categoryContainer.append('<span>' + relatedPost.category + '</span>')
    }
*/	
    for (post in tabData.relatedPosts) {
      relatedPostContainer.append('<span>' + tabData.relatedPosts[post].category + '</span>')
    }
    
/*
  for (tag in tabData.tags) {
    categories.push($('<span>' + tabData.tags[tag] + '</span>'))
	 
  }

  $('#categoryContainer p').append(categories) */
})