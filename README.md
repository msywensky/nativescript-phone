[![npm](https://img.shields.io/npm/v/nativescript-phone.svg)](https://www.npmjs.com/package/nativescript-phone)
[![npm](https://img.shields.io/npm/dt/nativescript-phone.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-phone)

# NativeScript Phone

NativeScript plugin to use the device phone and SMS features for Android and iOS

### Native Info
- Android uses an Intent with [ACTION_CALL](https://developer.android.com/reference/android/content/Intent.html#ACTION_CALL) for phone calls & [ACTION_VIEW](https://developer.android.com/reference/android/content/Intent.html#ACTION_VIEW) for SMS.
- iOS uses the [telprompt](https://developer.apple.com/library/content/featuredarticles/iPhoneURLScheme_Reference/PhoneLinks/PhoneLinks.html) for phone calls & [MFMessageComposeViewController](https://developer.apple.com/reference/messageui/mfmessagecomposeviewcontroller) for SMS.

## Installation

Install the plugin using the NativeScript CLI tooling

```
tns plugin add nativescript-phone
```

## Video Tutorial
[egghead plugin lesson @ https://egghead.io/lessons/javascript-using-the-device-phone-and-sms-with-nativescript](https://egghead.io/lessons/javascript-using-the-device-phone-and-sms-with-nativescript)

### Android

To dial the phone without user interaction on Android your app must request permission to dial. The following must be in your app's AndroidManifest.xml. The plugin should add this for you if it does not exist already.

```xml
<uses-permission android:name="android.permission.CALL_PHONE" />
```

### IOS 

You must add the following line to your project's Info.plist

```xml
<key>LSApplicationQueriesSchemes</key>
<array>
   <string>tel</string>
   <string>telprompt</string>
</array>
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
* smsNum: SMS number or numbers to use.
* messageText: String to send.

For example, the code below opens the sms app for the provided number:

Send to one number (provided for backwards compatibility)

```js
// my-page.js
var phone = require( "nativescript-phone" );
phone.sms("212-555-1234","My Message") //New Method for single number is phone.sms(["212-555-1234"],"My Message")
.then(function(args){
        /// args.reponse: "success", "cancelled", "failed"
        console.log(JSON.stringify(args));
    },
    function(err){
        console.log("Error: " + err);
    }
);
```

Send to multiple numbers

```js
// my-page.js
var phone = require( "nativescript-phone" );
phone.sms(["212-555-1234","212-555-1245"],"My Message")
.then(function(args){
        /// args.reponse: "success", "cancelled", "failed"
        console.log(JSON.stringify(args));
    },
    function(err){
        console.log("Error: " + err);
    }
);
```

#### requestCallPermission: Request Android Call_Phone Permission
#### Parameters
* explanationText: The explanation text if the user denies permission twice.
If you attempt to use `dial("122929912", false)` to not prompt on android 6.0 nothing will happen unless permission has been approved. When this method is executed a check for permissions happens, if no permissions it returns a string as a warning. There is no harm in wrapping your `dial()` inside of the `requestCallPermission()` method.


### TypeScript example

```TypeScript

import * as TNSPhone from 'nativescript-phone';

/// Dial a phone number.
public callHome() {
    TNSPhone.dial('415-123-4567', false);
}

// Text a number (or multiple numbers)
public messageParents() {
    TNSPhone.sms(['212-555-1234', '212-555-0987'], "Text till your fingers bleed")
        .then((args) => {
            console.log(JSON.stringify(args));
        }, (err) => {
            console.log('Error: ' + err);
        })
}


```
