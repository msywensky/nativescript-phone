import { Frame } from '@nativescript/core';
import { DialEvents, SMSEvents } from './interfaces';
import { LocalEventEmitter } from './LocalEventEmitter';

export { DialEvents, SMSEvents } from './interfaces';
export const NSPhoneEventEmitter = new LocalEventEmitter();

@NativeClass()
class CustomMFMessageComposeViewControllerDelegate
  extends NSObject
  implements MFMessageComposeViewControllerDelegate {
  static ObjCProtocols = [MFMessageComposeViewControllerDelegate];

  static new() {
    return super.new() as CustomMFMessageComposeViewControllerDelegate;
  }

  messageComposeViewControllerDidFinishWithResult(controller, result) {
    controller.dismissModalViewControllerAnimated(true);

    if (result === MessageComposeResult.Cancelled) {
      NSPhoneEventEmitter.notify({
        eventName: SMSEvents.CANCELLED
      });
    } else if (result === MessageComposeResult.Sent) {
      NSPhoneEventEmitter.notify({
        eventName: SMSEvents.SUCCESS
      });
    } else if (result === MessageComposeResult.Failed) {
      NSPhoneEventEmitter.notify({
        eventName: SMSEvents.FAILED
      });
    }
    CFRelease(controller.messageComposeDelegate);
  }
}

export function sms(smsNum, messageText) {
  try {
    if (!Array.isArray(smsNum)) {
      smsNum = [smsNum];
    }

    const page = Frame.topmost().ios.controller;
    const controller = MFMessageComposeViewController.alloc().init();
    const delegate = CustomMFMessageComposeViewControllerDelegate.alloc().init() as CustomMFMessageComposeViewControllerDelegate;

    CFRetain(delegate);
    controller.messageComposeDelegate = delegate;

    if (MFMessageComposeViewController.canSendText()) {
      controller.body = messageText;
      controller.recipients = smsNum;
      page.presentModalViewControllerAnimated(controller, true);
    } else {
      NSPhoneEventEmitter.notify({
        eventName: SMSEvents.FAILED,
        data: {
          error: 'Cannot send SMS.'
        }
      });
    }
  } catch (error) {
    NSPhoneEventEmitter.notify({
      eventName: SMSEvents.ERROR,
      data: {
        error: error
      }
    });
  }
}

export function dial(telNum, prompt) {
  try {
    let sURL = 'tel://';

    if (prompt) {
      sURL = 'telprompt:';
    }

    const url = NSURL.URLWithString(sURL + telNum);

    if (UIApplication.sharedApplication.canOpenURL(url)) {
      UIApplication.sharedApplication.openURL(url);
      NSPhoneEventEmitter.notify({
        eventName: DialEvents.SUCCESS
      });
      return true;
    } else {
      NSPhoneEventEmitter.notify({
        eventName: DialEvents.FAILED
      });
      return false;
    }
  } catch (error) {
    NSPhoneEventEmitter.notify({
      eventName: DialEvents.ERROR,
      data: {
        error: error
      }
    });

    return false;
  }
}

export function requestCallPermission(explanation) {
  return new Promise(resolve => {
    resolve('NativeScript-Phone: N/A');
  });
}
