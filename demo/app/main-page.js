import {
  NSPhoneEventEmitter,
  sms,
  dial,
  requestCallPermission,
  SMSEvents,
  DialEvents
} from 'nativescript-phone';
import { Observable } from '@nativescript/core';
const vm = new Observable();

vm.set('number', '800-555-5555');

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

// Event handler for Page "loaded" event attached in main-page.xml
export function pageLoaded(args) {
  const page = args.object;
  page.bindingContext = vm;
}

export function callNumber() {
  const number = vm.get('number');

  NSPhoneEventEmitter.once(DialEvents.FAILED, args => {
    console.log('Dial FAILED', args.data);
  });
  NSPhoneEventEmitter.once(DialEvents.ERROR, args => {
    console.log('Dial ERROR', args.data);
  });

  const dialResult = dial(number, true);
  console.log(`dialResult: ${dialResult}`);
}

export function callNumberWithoutPrompt() {
  const number = vm.get('number');

  NSPhoneEventEmitter.once(DialEvents.FAILED, args => {
    console.log('Dial FAILED', args.data);
  });
  NSPhoneEventEmitter.once(DialEvents.ERROR, args => {
    console.log('Dial ERROR', args.data);
  });

  const dialResult = dial(number, false);
  console.log(`dialResult: ${dialResult}`);
}

export function requestAndroidPerm() {
  try {
    requestCallPermission(
      'We need this permission to call the number without prompting user to confirm the number.'
    );
  } catch (e) {
    console.log(e);
  }
}

export function textNumber() {
  const number = vm.get('number');

  sms([number], 'testing');
}
