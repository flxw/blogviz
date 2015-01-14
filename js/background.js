'use strict';

// ---- global vars -----------------------------
var tabStates = {}
var currentTabId = null
var dbLocation = 'http://blog-intelligence.com/XSEngine/WebPlugin'
var checkHostEndpoint = '/checkHost.xsjs'
var checkPostEndpoint = '/checkPostUrl.xsjs'
var colorset = {"lastColor":-1, "colors":["#B6CB4D",'#CB774D','#CB4D8C', '#A14DCB']}

// ---- global functions ------------------------
// helpers
function changeStateIconTo(state) {
  switch (state) {
    case 'active':
      var popupType = tabStates[currentTabId].type
      chrome.browserAction.setPopup({ popup: 'popup.html#/' + popupType})
      break;

    case 'inactive':
      chrome.browserAction.setPopup({ popup: ''})
      break;
  }

  var icon = 'img/icon_' + state + '.png'
  chrome.browserAction.setIcon({path : icon})
}

function initializeTabDatastoreFor(tId) {
  tabStates[tId] = {
    type: null,
    state: 'inactive',
    tags : [],
    postCount : null
  }
}

function sendGetRequestTo(endpoint, callback) {
  var httpRequest = new XMLHttpRequest()

  httpRequest.open('GET', dbLocation + endpoint, true)
  httpRequest.setRequestHeader('Authorization', 'Basic U01BMTQxNTpQb3Bjb3JuNTQ=')

  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState == 4) {
      var responseObject = null

      if (httpRequest.responseText) {
        responseObject = JSON.parse(httpRequest.responseText)
      }

      callback(httpRequest.status, responseObject)
    }
  }

  httpRequest.send()
}

function getPostDetailsFor(tabId, url) {
  sendGetRequestTo(checkPostEndpoint + '?url=' + url, function(status, jsonResponse) {
    if (status === 200) {
      tabStates[tabId].state     = 'active'
      tabStates[tabId].type      = 'post'
      tabStates[tabId].tags      = jsonResponse.tags
      tabStates[tabId].relatedPosts = jsonResponse.relatedPosts
      tabStates[tabId].postCount = jsonResponse.postCount

      if (Object.keys(jsonResponse.sentiments).length > 0) {
        tabStates[tabId].sentiments = jsonResponse.sentiments
      } else {
        tabStates[tabId].sentiments = null
      }

      addAdditionalInformation(tabStates[tabId].relatedPosts)
    } else {
      tabStates[tabId].state = 'inactive'
      requirePostCrawler(url)
    }

    if (currentTabId === tabId) {
      changeStateIconTo(tabStates[tabId].state)
    }
  })
}

function addAdditionalInformation(relatedPosts) {
  for(var relatedPost in relatedPosts) {
    for(var post in relatedPosts[relatedPost].posts) {
      var actualPost = relatedPosts[relatedPost].posts[post]
      actualPost.firstLetter = getInitials(actualPost.title)
      actualPost.color = getNextColor()
      setAdditionalTags(actualPost.url, actualPost)
    }
  }
}

function getInitials (title) {
  var initials = ""
  var i = 0
  while(initials.length < 2 && i < title.length) {
    var nextLetter = title.substr(i,1)
    if(nextLetter.match(/[a-zA-Z]/))
      initials += nextLetter
    i += 1
  }
  return initials
}

function setAdditionalTags(url, post) {
  sendGetRequestTo(checkPostEndpoint + '?url=' + url, function(status, jsonResponse) {
    if (status === 200)
      post.tags = jsonResponse.tags
  })
}

function getNextColor() {
  // Get random color, but not the color, which has returned before
  var nextColor;
  do {
    nextColor = Math.floor(Math.random() * (colorset.colors.length))
  } while(nextColor === colorset.lastColor)
  colorset.lastColor = nextColor
  return colorset.colors[nextColor]
}

function getHostDetailsFor(tabId, url) {
  sendGetRequestTo(checkHostEndpoint + '?url=' + url, function(status, jsonResponse) {
    if (status === 200) {
      tabStates[tabId].state     = 'active'
      tabStates[tabId].type      = 'page'
      tabStates[tabId].tags      = jsonResponse.tags
      tabStates[tabId].postCount = jsonResponse.postCount
      tabStates[tabId].relatedHosts = jsonResponse.relatedHosts

      if (Object.keys(jsonResponse.sentiments).length > 0) {
        tabStates[tabId].sentiments = jsonResponse.sentiments
      } else {
        tabStates[tabId].sentiments = null
      }
    } else {
      tabStates[tabId].state = 'inactive'
    }

    if (currentTabId === tabId) {
      changeStateIconTo(tabStates[tabId].state)
    }
  })
}

/* Requires the crawler to crawl the post page, but only if the host is in the database */
function requirePostCrawler(url){

  var baseUrl = getBaseUrlFrom(url)
  sendGetRequestTo(checkHostEndpoint + '?url=' + baseUrl, function(status, jsonResponse) {
    if (status === 200)
      crawlPost(url)
  })
}

function getBaseUrlFrom(url) {
  var pathArray = (url).split('/')
  var baseUrl = pathArray[0] + '//' + pathArray[2]
  return baseUrl
}

function crawlPost(url) {
  // Logic
  // TODO Implement the crawler
  console.log('FAKE: The page ' + url + ' is getting crawled.')
}


function isBaseUrl(url) {
  url = url.replace(/^.*:\/\//,'')
  var firstSlashIndex = url.indexOf('/')

  return url.indexOf('/', firstSlashIndex + 1) < 0
}

// important
function acquireTabStateFor(tabId, url) {
  if (!(tabId in tabStates)) {
    // sometimes the tab id changes and there is an error
    // finding out why could be useful - this is a quick fix until now
    initializeTabDatastoreFor(tabId)
  }


  if (isBaseUrl(url)) {
    if (url[url.length-1] === '/') {
      url = url.substring(0, url.length-1)
    }
    getHostDetailsFor(tabId, url)
  } else {
    getPostDetailsFor(tabId, url)
  }
}

// ---- logic, bitches --------------------------
chrome.tabs.onRemoved.addListener(function(removedTabId, removeInfo) {
  if (removedTabId in tabStates) {
    delete tabStates[removedTabId]
  }
})

// every time a different tab gets highlighted, the displayed information
// inside the popup needs to be changed
chrome.tabs.onActivated.addListener(function(changeInfo) {
  currentTabId = changeInfo.tabId
  if (currentTabId in tabStates) {
    changeStateIconTo(tabStates[currentTabId].state)
  } else {
    console.log('Tab ID ' + currentTabId + ' is not inside the tabState database!')
    initializeTabDatastoreFor(currentTabId)
    changeStateIconTo('inactive')
  }
})


// when the page inside a tab changes, the content scripts
// are re-run as well and thus the state information may need to be updated here
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (sender.tab) {
    switch(request.type) {
      case 'setTabUrl':
        acquireTabStateFor(sender.tab.id, request.url)
        return true
    }
  } else {
    // request comes from the popup
    switch(request.type) {
      case 'getCurrentTabInformation':
        sendResponse(tabStates[currentTabId])
        return true
    }
  }
})
