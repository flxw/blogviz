
var dbLocation = 'http://192.168.42.38:8003/WebPlugin'
var checkHostEndpoint = '/checkHost.xsjs'
var checkPostEndpoint = '/checkPostUrl.xsjs'

// to keep it easy
var jsonObjectTrue = {
	"found" : true,
	"postCount" : Math.round(Math.random()*100)
}
var jsonObjectFalse = {
	"found" : false,
	"postCount" : Math.round(Math.random()*100)
}


var contentURL = window.content.location.href;
console.log("Page has changed.")
console.log(window.content.location.href)




self.port.on("setTabUrl", function() {

    //LOGIC guys

  if(Math.random()>0.5)
    self.port.emit("gotElement", jsonObjectTrue)
  else 
    self.port.emit("gotElement", jsonObjectFalse)
});