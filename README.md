# NativeScript Phone

A NativeScript module providing phone actions for Android and iOS.

## Installation

Install the plugin using the NativeScript CLI tooling

```
tns plugin add nativescript-phone
```

### Android

To dial the phone without user interaction on Android your app must request permission to dial. To do so, add the following line to your project's AndroidManifest.xml:

```xml
<uses-permission android:name="android.permission.CALL_PHONE" />
```

## Usage

To use the phone module you must first `require()` it from your project's `node_modules` directory:

```js
var phone = require( "nativescript-phone/phone" );
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
phone.sms("212-555-1234","My message");
```
