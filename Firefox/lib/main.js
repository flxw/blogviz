var tabStates = {};

var { ToggleButton } = require('sdk/ui/button/toggle');
var panels = require("sdk/panel");
var self = require("sdk/self");

var button = ToggleButton({
  id: "my-button",
  label: "BlogIntelligence Insights",
  icon: {
    "16": "./img/icon_inactive.png"
  },
  onChange: handleChange
});

var panel = panels.Panel({
  contentURL: self.data.url("popup.html"),
  contentScriptFile: self.data.url("popup.js"),
  onHide: handleHide,
  height: 502,
  width: 402, 
  position: button
});

function handleChange(state) {
  if (state.checked) {
    panel.show();
  }
}

function handleHide() {
  button.state('window', {checked: false});
}

panel.on("show", function() {
  panel.port.emit("showA",tabStates[1])
  console.log("Test update")
})
var pageMod = require("sdk/page-mod");

pageMod.PageMod({
  include: ['*'],
  contentScriptFile: self.data.url("content.js"),
  onAttach: function(worker) {
    var url = "kicker.de"
		worker.port.emit("setTabUrl");
    worker.port.on("gotElement", function(receivedJson) {
      tabStates[1] = {
        type: null,
        state: 'inactive',
        tags : [],
        postCount : null
      }

      if (receivedJson.found) {
		tabStates[1].state = 'active';
		tabStates[1].found = true;
		tabStates[1].postCount = receivedJson.postCount;
	  } else {
		tabStates[1].state = 'inactive';
		tabStates[1].postCount = 'ERROR';
	  }	
	  changeStateIconTo(tabStates[1].state)

      console.log(receivedJson);
    });
  } 
});

function changeStateIconTo(state) {
	var icon = './img/icon_' + state + '.png'
	console.log("Icon: "+icon)
	button.icon = {
		"16": icon
	}
}
