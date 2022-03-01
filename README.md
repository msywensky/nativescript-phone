[![npm](https://img.shields.io/npm/v/nativescript-phone.svg)](https://www.npmjs.com/package/nativescript-phone)
[![npm](https://img.shields.io/npm/dt/nativescript-phone.svg?label=npm%20downloads)](https://www.npmjs.com/package/nativescript-phone)

# NativeScript Phone

NativeScript plugin to use the device phone and SMS features for Android and iOS

### Native Info

- Android uses an Intent with [ACTION_CALL](https://developer.android.com/reference/android/content/Intent.html#ACTION_CALL) for phone calls & [ACTION_SENDTO](https://developer.android.com/reference/android/content/Intent.html#ACTION_SENDTO) for SMS.
- iOS uses the [telprompt](https://developer.apple.com/library/content/featuredarticles/iPhoneURLScheme_Reference/PhoneLinks/PhoneLinks.html) for phone calls & [MFMessageComposeViewController](https://developer.apple.com/reference/messageui/mfmessagecomposeviewcontroller) for SMS.

## Installation

Install the plugin using the NativeScript CLI

```
tns plugin add nativescript-phone
```

### Breaking Change with 3.x.x

Version 3.x.x and later uses an event system to dispatch events for the handling of success, failure, errors for the SMS and Dial methods.
See the snippets below for the correct usage of the event emitter system.

## Video Tutorial

[egghead plugin lesson @ https://egghead.io/lessons/javascript-using-the-device-phone-and-sms-with-nativescript](https://egghead.io/lessons/javascript-using-the-device-phone-and-sms-with-nativescript)

### Android

To dial the phone without user interaction on Android your app must request permission to dial. The following must be in your app's AndroidManifest.xml.

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
var phone = require('nativescript-phone');
```

After you have a reference to the module you can then call the available methods.

### Methods

#### dial: initiate a phone call

##### Parameters

- telNum: Phone number to dial.
- prompt: Boolean to enable OS specific confirmation before dialing.

For example, the code below dials the number without showing the device specific confirmation prompt:

```js
// my-page.js
var phone = require('nativescript-phone');
phone.dial('212-555-1234', false);
```

#### sms: open the OS specific SMS app

##### Parameters

- smsNum: SMS number or numbers to use.
- messageText: String to send.

For example, the code below opens the sms app for the provided number:

Send to one number (provided for backwards compatibility)

```js
// my-page.js

import {
  NSPhoneEventEmitter,
  sms,
  dial,
  requestCallPermission,
  SMSEvents,
  DialEvents
} from 'nativescript-phone';

NSPhoneEventEmitter.on(SMSEvents.FAILED, args => {
  console.log('FAILED', args.data);
});

NSPhoneEventEmitter.on(SMSEvents.SUCCESS, args => {
  console.log('SMS Successful');
});

NSPhoneEventEmitter.on(SMSEvents.CANCELLED, args => {
  console.log('SMS Cancelled');
});

NSPhoneEventEmitter.on(SMSEvents.ERROR, args => {
  console.log('SMS ERROR', args.data);
});

NSPhoneEventEmitter.on(SMSEvents.UNKNOWN, args => {
  console.log('SMS UNKNOWN', args.data);
});

sms(['212-555-1234'], 'testing');
```

Send to multiple numbers

```js
import { sms } from 'nativescript-phone';
// Use the event system to listen for failure, success, cancelled, error events

sms(['212-555-1234', '212-555-1245'], 'My Message');
```

#### requestCallPermission: Request Android Call_Phone Permission

#### Parameters

- explanation: The explanation text if the user denies permission twice (nullable).
  If you attempt to use `dial("122929912", false)` to not prompt on android 6.0, nothing will happen unless permission has been approved before.
  When this method is executed, a check for permissions happens, and a promise is returned.
  If the user refuse it, you can handle it via the `catch` method of promise. If it accepts you can dial in the `then`method.
  You should so "wrap" your `dial` method inside of the `requestCallPermission()` method (see following example).

### TypeScript example

```ts
import {
  NSPhoneEventEmitter,
  sms,
  dial,
  requestCallPermission,
  SMSEvents,
  DialEvents
} from 'nativescript-phone';

NSPhoneEventEmitter.on(SMSEvents.ERROR, args => {
  console.log('SMS ERROR', args.data);
});

NSPhoneEventEmitter.on(SMSEvents.UNKNOWN, args => {
  console.log('SMS UNKNOWN', args.data);
});

/// Dial a phone number.
function callHome() {
  const phoneNumber = '415-123-4567';
  requestCallPermission(
    'You should accept the permission to be able to make a direct phone call.'
  )
    .then(() => dial(phoneNumber, false))
    .catch(() => dial(phoneNumber, true));
}

// Text a number (or multiple numbers)
function messageParents() {
  sms(['212-555-1234', '212-555-0987'], 'Text till your fingers bleed');
}
```
