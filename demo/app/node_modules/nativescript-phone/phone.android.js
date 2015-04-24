var application = require("application");

function dial(telNum,prompt) {

	try {
		var intentType = android.content.Intent.ACTION_CALL;
		if (prompt) {
			intentType = android.content.Intent.ACTION_DIAL
		}

		var intent = new android.content.Intent(intentType);

		intent.setData(android.net.Uri.parse("tel:" + telNum));

		application.android.foregroundActivity.startActivity(intent);
		return true;

	} catch(ex) {
		alert("Unable to dial");
		console.log("phone.dial failed: " + ex);
		return false;
	}
}

function sms(smsNum, messageText) {
	try {
		var intent = new android.content.Intent(android.content.Intent.ACTION_VIEW);
		intent.setData(android.net.Uri.parse("sms:" + smsNum));
		intent.putExtra("sms_body", messageText);
		application.android.foregroundActivity.startActivity(intent);
		return true;

	} catch(ex) {
		alert("Unable to open sms");
		console.log("phone.sms failed: " + ex);
		return false;
	}
}

exports.dial = dial;
exports.sms = sms;
