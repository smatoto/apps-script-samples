/**
 * Send message to Google Chat webhook
 * @param {Array} events Array of objects containing calendarNames and events
 */
function sendChat(events: Array<object>) {
  const WEBHOOK_URL = PropertiesService.getScriptProperties().getProperty('webhookUrl');
  /**
   * Build Hangouts Chat simple message
   * https://developers.google.com/hangouts/chat/reference/message-formats/basic
   */
  let message = '';

  // Iterate through each event
  events.forEach((event: any) => {
    // Add newline for events from other calendars
    if (message.length) message += '\n';
    message += `*${event.calendar}*\n`;
    event.events.forEach((event: any) => {
      message += `${event.getTitle().trim()}\n`;
    });
  });

  // Build request parameters
  const options: any = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      text: message,
    }),
  };

  // Sent POST request to webhook
  try {
    UrlFetchApp.fetch(WEBHOOK_URL, options);
  } catch (err) {
    console.log(err);
  }
}
