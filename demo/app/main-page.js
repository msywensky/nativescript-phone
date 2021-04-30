import {
  NSPhoneEventEmitter,
  sms,
  dial,
  requestCallPermission
} from 'nativescript-phone';
import { Observable } from '@nativescript/core';
const vm = new Observable();

vm.set('number', '800-555-5555');

// Event handler for Page "loaded" event attached in main-page.xml
export function pageLoaded(args) {
  const page = args.object;
  page.bindingContext = vm;
}

export function callNumber() {
  const number = vm.get('number');
  const dialResult = dial(number, true);
  console.log(`dialResult: ${dialResult}`);
}

export function callNumberWithoutPrompt() {
  const number = vm.get('number');
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

  NSPhoneEventEmitter.on(SMSEvents.FAILED, args => {
    console.log('FAILED', args.data);
  });

  NSPhoneEventEmitter.on(SMSEvents.SUCCESS, args => {
    console.log('SUCCESS', args.data);
  });

  phone.NSPhoneEventEmitter.on(SMSEvents.CANCELLED, args => {
    console.log('CANCELLED', args.data);
  });

  sms([number], 'testing');
}
