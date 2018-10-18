/**
 * Initiate a phone call.
 * @param {string} number - The number to dial.
 * @param {boolean} confirm - To enable OS specific confirmation before dialing.
 * @returns {boolean} Result of dial
 */
export function dial(number: string, confirm: boolean): boolean;

/**
 * Open the OS specific SMS app.
 * @param {Array<string>} numbers - The number to send SMS to.
 * @param {string} message - The message to send.
 * @returns {Promise} response
 */
export function sms(numbers: Array<string>, message: string): Promise<response>;

/**
 * Request Call Permission on Android (dummy function on ios).
 * @param {string} explanation - The explanation text if the user denies permission twice.
 * @returns {Promise} Permission granted for then, denied for catch.
 */
export function requestCallPermission(explanation?: string): Promise<string>;

interface response {
  success: string;
  cancelled: string;
  failed: string;
}
