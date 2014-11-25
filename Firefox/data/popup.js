
var postCount = document.getElementById("postCount")
self.port.on("showA", function onShow(tabStates) {
	console.log("Got message")
	postCount.innerHTML = tabStates.postCount
});