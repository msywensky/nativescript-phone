// @ts-check
var phone = require('nativescript-phone');
var app = require('tns-core-modules/application');
var observable = require('tns-core-modules/data/observable');
var vm = new observable.Observable();

vm.set('number', '800-555-5555');

// Event handler for Page "loaded" event attached in main-page.xml
export function pageLoaded(args) {
  var page = args.object;
  page.bindingContext = vm;
}

export function callNumber() {
  var number = vm.get('number');
  var dialResult = phone.dial(number, true);
  console.log(`dialResult: ${dialResult}`);
}

export function callNumberWithoutPrompt() {
  var number = vm.get('number');
  var dialResult = phone.dial(number, false);
  console.log(`dialResult: ${dialResult}`);
}

export function requestAndroidPerm() {
  try {
    phone.requestCallPermission(
      'We need this permission to call the number without prompting user to confirm the number.'
    );
  } catch (e) {
    console.log(e);
  }
}

export function textNumber() {
  var number = vm.get('number');
  phone.sms([number], 'testing').then(
    function (args) {
      console.log(JSON.stringify(args));
    },
    function (err) {
      console.log('Error: ' + err);
    }
  );
}
