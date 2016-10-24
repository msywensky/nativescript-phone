/**
 * Initiate a phone call.
 * @param {string} number - The number to dial.
 * @param {boolean} confirm - To enable OS specific confirmation before dialing.
 */
export function dial(number: string, confirm: boolean): void;


/**
 * Open the OS specific SMS app.
 * @param {Array<string>} numbers - The number to send SMS to.
 * @param {string} message - The message to send.
 * @returns {Promise} response
 */
export function sms(numbers: Array<string>, message: string): Promise<response>;


interface response {
    "success": string,
    "cancelled": string,
    "failed": string
}