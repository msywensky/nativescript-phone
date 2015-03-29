var observable = require("data/observable");
var vm = new observable.Observable();

mainViewModel.set("number", "800-555-5555");

// Event handler for Page "loaded" event attached in main-page.xml
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vm;
}

function callNumber() {

}

function textNumber() {
  
}

exports.pageLoaded = pageLoaded;
exports.callNumber = callNumber;
exports.textNumber = textNumber;
