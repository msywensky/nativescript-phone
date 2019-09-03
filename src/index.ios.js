// @ts-check
/// <reference path="./node_modules/tns-platform-declarations/ios.d.ts" />

var frameModule = require('tns-core-modules/ui/frame');
var CustomMFMessageComposeViewControllerDelegate = NSObject.extend(
  {
    initWithResolveReject: function(resolve, reject) {
      var self = this.super.init();
      if (self) {
        this.resolve = resolve;
        this.reject = reject;
      }
      return self;
    },
    messageComposeViewControllerDidFinishWithResult: function(
      controller,
      result
    ) {
      controller.dismissModalViewControllerAnimated(true);

      if (result === MessageComposeResult.Cancelled) {
        this.resolve({
          response: 'cancelled'
        });
      } else if (result === MessageComposeResult.Sent) {
        this.resolve({
          response: 'success'
        });
      } else {
        this.resolve({
          response: 'failed'
        });
      }
      CFRelease(controller.messageComposeDelegate);
    }
  },
  {
    name: 'CustomMFMessageComposeViewControllerDelegate',
    protocols: [MFMessageComposeViewControllerDelegate]
  }
);

function dial(telNum, prompt) {
  var sURL = 'tel://';

  if (prompt) {
    sURL = 'telprompt:';
  }

  var url = NSURL.URLWithString(sURL + telNum);

  if (UIApplication.sharedApplication.canOpenURL(url)) {
    UIApplication.sharedApplication.openURL(url);
    return true;
  } else {
    //alert("Unable to dial");
    return false;
  }
}

function sms(smsNum, messageText) {
  return new Promise(function(resolve, reject) {
    if (!Array.isArray(smsNum)) {
      smsNum = [smsNum];
    }

    var page = frameModule.topmost().ios.controller;
    var controller = MFMessageComposeViewController.alloc().init();
    var delegate = CustomMFMessageComposeViewControllerDelegate.alloc().initWithResolveReject(
      resolve,
      reject
    );

    CFRetain(delegate);
    controller.messageComposeDelegate = delegate;

    if (MFMessageComposeViewController.canSendText()) {
      controller.body = messageText;
      controller.recipients = smsNum;
      page.presentModalViewControllerAnimated(controller, true);
    } else {
      reject('Cannot Send SMS!');
    }
  });
}

function requestCallPermission(explanation) {
  return new Promise(function(resolve) {
    resolve('N/A');
  });
}

exports.dial = dial;
exports.sms = sms;
exports.requestCallPermission = requestCallPermission;
