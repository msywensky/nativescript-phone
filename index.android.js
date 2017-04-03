const app = require("application");
const permissions = require("nativescript-permissions");

const CurrentContext = app.android.currentContext;
const Intent = android.content.Intent;
const ContextCompat = android.support.v4.content.ContextCompat;
const CALL_PHONE = android.Manifest.permission.CALL_PHONE;
const PERMISSION_GRANTED = android.content.pm.PackageManager.PERMISSION_GRANTED;

function dial(telNum, prompt = true) {
  try {
    var intentType = Intent.ACTION_DIAL;

    if (prompt === false) {
      // check permissions
      var hasPerms = permissions.hasPermission(CALL_PHONE);
      if (hasPerms === false) {
        return "Application does not have permission to call directly.";
      }

      intentType = Intent.ACTION_CALL;
    }

    var intent = new Intent(intentType);

    // support for ussd numbers with # on android
    telNum = telNum.replace("#", encodeURIComponent("#"));

    intent.setData(android.net.Uri.parse("tel:" + telNum));

    app.android.foregroundActivity.startActivity(intent);

    return true;
  } catch (ex) {
    console.log(ex);
    return ex;
  }
}

function sms(smsNum, messageText) {
  return new Promise(function(resolve, reject) {
    if (!Array.isArray(smsNum)) {
      smsNum = [smsNum];
    }

    try {
      var SEND_SMS = 1001;
      // var intent = new Intent(Intent.ACTION_SENDTO);
      var intent = new Intent(Intent.ACTION_VIEW);
      // intent.addCategory(Intent.CATEGORY_DEFAULT);
      intent.putExtra("sms_body", messageText);
      intent.setType("vnd.android-dir/mms-sms");
      intent.setData(android.net.Uri.parse("sms:" + smsNum.join(";")));

      app.android.foregroundActivity.startActivityForResult(intent, SEND_SMS);

      // var previousResult = app.android.onActivityResult;
      app.android.onActivityResult = function(requestCode, resultCode, data) {
        // Check which request we're responding to
        if (requestCode === SEND_SMS) {
          if (resultCode === android.app.Activity.RESULT_OK) {
            return resolve({
              response: "success"
            });
          } else if (resultCode === android.app.Activity.RESULT_CANCELED) {
            return resolve({
              response: "cancelled"
            });
          } else {
            return resolve({
              response: "failed"
            });
          }
        }
      };
    } catch (ex) {
      reject(ex.toString());
    }
  });
}

function requestCallPermission(explanation) {
  if (explanation !== "") {
    permissions.requestPermission(CALL_PHONE, explanation).then(
      function(result) {
        return result;
      },
      function(error) {
        return error;
      }
    );
  }
}

function hasCallPermission() {
  var result = permissions.hasPermission(CALL_PHONE);
  return result;
}

exports.dial = dial;
exports.sms = sms;
exports.requestCallPermission = requestCallPermission;
