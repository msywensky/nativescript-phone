var observable = require("data/observable");
var phone = require("nativescript-phone");

var vm = new observable.Observable();

vm.set("number", "800-555-5555");

// Event handler for Page "loaded" event attached in main-page.xml
function pageLoaded(args) {
    var page = args.object;
    page.bindingContext = vm;
}

function callNumber() {
  var number = vm.get("number");
  phone.dial(number,true);
}

function textNumber() {
  var number = vm.get("number");
  phone.sms(number,"testing");
}

exports.pageLoaded = pageLoaded;
exports.callNumber = callNumber;
exports.textNumber = textNumber;