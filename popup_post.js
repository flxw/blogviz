// Just for coding at home
var tabDataErsatz = {
    "found": "true",
    "tags": [
        "Godzilla",
        "Kaiju",
        "Rawr",
        "Godzilla 2014",
        "Alex Cherry"
    ],
    "relatedPosts": [
        {
            "category": "Godzilla",
            "posts": [
                {
                    "title": null,
                    "url": "http://www.theguardian.com/film/quiz/2014/may/18/godzilla-how-much-know-quiz",
                    "host": "www.theguardian.com"
                },
                {
                    "title": "Chicago Says Goodby Ronan nald Trump)",
                    "url": "http://www.jimmyfungus.com/2014/06/chicago-says-goodbye-to-comedian-dan.html",
                    "host": "www.jimmyfungus.com"
                },
                {
                    "title": "'Godzilla' Sequel To Feature nsters",
                    "url": "http://www.airlockalpha.com/node/9950/godzilla-sequel-to-feature-classic-monsters.html",
                    "host": "www.airlockalpha.com"
                },
                {
                    "title": "Godzilla, friends to reunite KONG TOO]",
                    "url": "http://www.toplessrobot.com/2014/07/godzilla_friends_to_reunite.php",
                    "host": "www.toplessrobot.com"
                },
                {
                    "title": "Japani saapuu Suomeen",
                    "url": "http://sylvi.fi/2014/07/japani-saapuu-suomeen/",
                    "host": "sylvi.fi"
                }
            ]
        },
        {
            "category": "Kaiju",
            "posts": [
                {
                    "title": null,
                    "url": "http://www.infinitehollywood.com/godzilla-2014-movie-review/",
                    "host": "www.infinitehollywood.com"
                },
                {
                    "title": null,
                    "url": "http://www.streetsofbeige.com/2014/07/rampage-ultra-kaiju-series-jamira.html",
                    "host": "www.streetsofbeige.com"
                },
                {
                    "title": "Photo",
                    "url": "http://priscillaat.com/post/85964457343",
                    "host": "priscillaat.com"
                },
                {
                    "title": null,
                    "url": "http://nerdsontherocks.com/kaiju-kommentary-godzilla-final-wars-2004/",
                    "host": "nerdsontherocks.com"
                },
                {
                    "title": null,
                    "url": "http://crescent31.tumblr.com/post/94827300781",
                    "host": "crescent31.tumblr.com"
                }
            ]
        },
        {
            "category": "Rawr",
            "posts": [
                {
                    "title": "Photo",
                    "url": "http://cherry.ac/post/88608015642",
                    "host": "cherry.ac"
                }
            ]
        },
        {
            "category": "Godzilla 2014",
            "posts": [
                {
                    "title": "Photo",
                    "url": "http://cherry.ac/post/88608015642",
                    "host": "cherry.ac"
                }
            ]
        },
        {
            "category": "Alex Cherry",
            "posts": [
                {
                    "title": "Photo",
                    "url": "http://cherry.ac/post/88608015642",
                    "host": "cherry.ac"
                },
                {
                    "title": "Photo",
                    "url": "http://cherry.ac/post/94495240187",
                    "host": "cherry.ac"
                }
            ]
        }
    ]
}


// chrome re-renders the popup every time it gets opened
chrome.runtime.sendMessage({type: 'getCurrentTabInformation'}, function(tabData) {
    var categoryContainer = $('#categoryContainer p')
    var relatedPostsContainer = $('#relatedPostContainer')
   for (post in tabDataErsatz.relatedPosts) {
      var relatedPost = createRelatedPost(tabDataErsatz.relatedPosts[post]);
      relatedPostsContainer.append(relatedPost)
   }
})

function createRelatedPost (relatedPost) {
    var code = "<div>"
    for(post in relatedPost.posts) {
        var title = relatedPost.posts[post].title
        var url  = relatedPost.posts[post].url
        var icon = getFavIcon(relatedPost.posts[post].host)
        if(UrlExists(icon)) {
            code += "<div id=\"relatedPost\">"
            code += "<div id=\"icon\"><img src="+icon+" width=\"40px\" height=\"40px\" alt=\"http://www.faz.net/favicon.ico\"></div>"
            code += "<div id=\"descriptionContainer\">"
            code +=     "<div ><b>"+title+"</b></div>"
            code +=     "<div><span>"+relatedPost.category+"</span></div>"
            code +=     "<div>"+maxIt(url)+"</div>"
            code += "</div>"
            code += "</div>"
        }
    } 
    code += "</div>"
    return code
}

function maxIt(text) {
    if (text.length>40)
        return text.substring(0,30) + "...";
    else
        return text
}


function getFavIcon(url) {
    return "http://" + url + "/favicon.ico"
}


function UrlExists(url)
{
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}
        