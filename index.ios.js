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

function groupMessage(numbers, message, subject) {
    
    return new Promise(function (resolve, reject) {  
        
        if(MFMessageComposeViewController.canSendText()){
            var controller = MFMessageComposeViewController.alloc().init();
            if(controller != null){
                
                var CustomMessageCompositeViewControllerDelegate = NSObject.extend({
                    messageComposeViewControllerDidFinishWithResult: function(controller, result) {
                        
                        controller.dismissModalViewControllerAnimated(true);
                        
                        console.log(result);

                            if(result == MessageComposeResultCancelled) {
                                console.log("Message Cancelled.");
                                resolve({
                                    response: "canceled",
                                    message: "User cancelled the message."
                                });
                            }
                            else if(result == MessageComposeResultSent) {
                                console.log("Message Sent.");
                                resolve({
                                    response: "sent",
                                    message: "Message sent."
                                });
                            }
                            else {
                                console.log("Something Failed.");
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
                if(subject){
                    controller.subject = subject;   
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
