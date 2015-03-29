
function dial(telNum,prompt) {
	var sURL = "tel://";

	if (prompt) {
		sURL = "telprompt:";
	}

	var url = NSURL.URLWithString(sURL + telNum);
	var a = UIApplication.sharedApplication();

	if (a.canOpenURL(url)) {
		a.openURL(url);
		return true;
	} else {
		alert("Unable to dial");
		return false;
	}

}

function sms(smsNum, messageText) {
	var sURL = "sms:" + smsNum;

	var url = NSURL.URLWithString(sURL);
	var a = UIApplication.sharedApplication();

	if (a.canOpenURL(url)) {
		a.openURL(url);
		return true;
	} else {
		alert("Unable to open sms");
		console.log("phone.sms failed: " + ex);
		return false;
	}

}

exports.dial = dial;
exports.sms = sms;
