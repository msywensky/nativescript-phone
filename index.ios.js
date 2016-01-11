var frameModule = require("ui/frame");

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
		//alert("Unable to dial");
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
		//alert("Unable to open sms");
		//console.log("phone.sms failed");
		return false;
	}

}

function groupMessage(numbers, message) {
    
    return new Promise(function (resolve, reject) {  
        
        if(MFMessageComposeViewController.canSendText()){
            var controller = MFMessageComposeViewController.alloc().init();
            if(controller != null){
                
                var CustomMessageCompositeViewControllerDelegate = NSObject.extend({
                    messageComposeViewControllerDidFinishWithResult: function(controller, result) {
                        
                        controller.dismissModalViewControllerAnimated(true);

                            if(result == MessageComposeResultCancelled) {
                                resolve({
                                    response: "canceled",
                                    message: "User cancelled the message."
                                });
                            }
                            else if(result == MessageComposeResultSent) {
                                resolve({
                                    response: "sent",
                                    message: "Message sent."
                                });
                            }
                            else {
                                reject(Error("Message send failed."));
                            }
                        
                        
                    }
                }, {
                    protocols: [MFMessageComposeViewControllerDelegate]
                });               
                
                if(numbers){
                    controller.recipients = numbers;   
                }            
                if(message){
                    controller.body = message;   
                }           
                
                controller.messageComposeDelegate = CustomMessageCompositeViewControllerDelegate.alloc().init();           
                var page = frameModule.topmost().ios.controller;
                page.presentModalViewControllerAnimated(controller, true);     
                                
            }else{
                reject(Error("You're not able to send SMS messages. Please check device settings."));
            }             
        } else {
            reject(Error("You're not able to send SMS messages. Please check device settings.")); 
        } 
    
    });   
}

exports.groupMessage = groupMessage;
exports.dial = dial;
exports.sms = sms;
