# NativeScript Phone

A NativeScript module providing phone actions for Android and iOS.

## Installation

Run `npm install nativescript-phone --save` from your project's `app` directory:

```
.
├── app  <------------------------------ run npm install from here
│   ├── App_Resources
│   │   ├── android
│   │   └── ios
│   ├── app.css
│   ├── app.js
│   ├── main-page.js
│   ├── main-page.xml
│   ├── node_modules
│   │   └── nativescript-phone <-- The install will place the module's code here
│   │       └── ...
│   └── package.json <----------------- The install will register “nativescript-phone” as a dependency here
│   └── tns_modules
│       └── ...
└── platforms
    ├── android
    └── ios
```

As is, using npm within NativeScript is still experimental, so it's possible that you'll run into some issues. A more complete solution is in the works, and you can check out [this issue](https://github.com/NativeScript/nativescript-cli/issues/362) for an update on its progress and to offer feedback.

If npm doesn't end up working for you, you can just copy and paste this repo's phone-common.js, phone.android.js, and phone.ios.js files into your app and reference them directly.

### Android

To dial the phone without user interaction on Android your app must request permission to dial. To do so, add the following line to your project's AndroidManifest.xml:

```xml
<uses-permission android:name="android.permission.CALL_PHONE" />
```

## Usage

To use the phone module you must first `require()` it from your project's `node_modules` directory:

```js
var phone = require( "nativescript-phone" );
```

After you have a reference to the module you can then call the available methods.

### Methods
#### dial: initiate a phone call
##### Parameters
* telNum: Phone number to dial.
* prompt: Boolean to enable OS specific confirmation before dialing.

For example, the code below dials the number without showing the device specific confirmation prompt:

```js
// my-page.js
var phone = require( "nativescript-phone" );
phone.dial("212-555-1234",false);
```
#### sms: open the OS specific SMS app
##### Parameters
* smsNum: SMS number to use.
* messageText: String to send. - Not supported on iOS at this time.

For example, the code below opens the sms app for the provided number:

```js
// my-page.js
var phone = require( "nativescript-phone" );
phone.sms("212-555-1234");
```

####groupMessage: open an SMS group chat - (Currently only supported on iOS)
This method is probably a better choice, even for single recipients if you want to define a message body.
##### Parameters
* numbers: An array of phone number strings. Supports just one or multiple.
* message: The body message that is being sent to group.

```js
// my-page.js
var phone = require( "nativescript-phone" );
phone.groupMessage("212-555-1234", "My message");
```

This method also returns a promise. Use as so to define actions after the user has either canceled or sent the message.

```js
    phone.groupMessage(["905-555-5555", "905-555-4444"], "this is body").then(function(args){
        console.log(args.response); 
        // either a string saying cancelled or sent
        console.log(args.message); 
        // just a string with more detail than response.
        
        /* you can do stuff here.. this happens back 
        in your app after the message window has 
        been dismissed */        
        
    }, function (e) {
        console.log("Error occurred " + e); 
        // e will show a vague error message.
    });    
```