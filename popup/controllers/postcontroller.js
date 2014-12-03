angular.module('postPopupPage').controller('PostController', ['$scope', '$location', function($scope, $location) {
  $scope.postData = {
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
        }
    ]
}

  /*chrome.runtime.sendMessage({type: 'getCurrentTabInformation'}, function(tabData) {
    $scope.pageData = tabData
    $scope.$apply()
  })*/
}])