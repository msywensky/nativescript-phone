var phone = require("nativescript-phone");
var app = require("application");
var observable = require("data/observable");
var vm = new observable.Observable();

vm.set("number", "800-555-5555");

// Event handler for Page "loaded" event attached in main-page.xml
function pageLoaded(args) {
  var page = args.object;
  page.bindingContext = vm;
}

function callNumber() {
  var number = vm.get("number");
  var dialResult = phone.dial(number, true);
  console.log(`dialResult: ${dialResult}`);
}

function callNumberWithoutPrompt() {
  var number = vm.get("number");
  var dialResult = phone.dial(number, false);
  console.log(`dialResult: ${dialResult}`);
}

function requestAndroidPerm() {
  try {
    phone.requestCallPermission(
      "We need this permission to call the number without prompting user to confirm the number."
    );
  } catch (e) {
    console.log(e);
  }
}

function textNumber() {
  var number = vm.get("number");
  phone.sms([number], "testing").then(
    function(args) {
      console.log(JSON.stringify(args));
    },
    function(err) {
      console.log("Error: " + err);
    }
  );
}

exports.pageLoaded = pageLoaded;
exports.callNumber = callNumber;
exports.callNumberWithoutPrompt = callNumberWithoutPrompt;
exports.textNumber = textNumber;
exports.requestAndroidPerm = requestAndroidPerm;
