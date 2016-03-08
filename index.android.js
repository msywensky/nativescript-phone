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
		//alert("Unable to dial");
		//console.log("phone.dial failed: " + ex);
		return false;
	}
}

function sms(smsNum, messageText) {
    return new Promise(function (resolve, reject){
        if(!smsNum instanceof Array){
            reject("Numbers are not in an array!");
        }
        
    	try {
    		var intent = new android.content.Intent(android.content.Intent.ACTION_VIEW);
            intent.putExtra("address", smsNum.join(";"));
    		intent.putExtra("sms_body", messageText);
            intent.setType("vnd.android-dir/mms-sms");
    		application.android.foregroundActivity.startActivity(intent);
            resolve({
                response:"success"
            });

    	} catch(ex) {
            reject(ex);
    	}
    });
}

exports.dial = dial;
exports.sms = sms;
