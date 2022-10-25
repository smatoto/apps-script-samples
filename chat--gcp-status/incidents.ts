/**
 * Official GCP status JSON feed
 * Please visit https://status.cloud.google.com/
 */
const GCP_JSON_FEED = 'https://status.cloud.google.com/incidents.json';
/**
 * Webhook URL of the Hangouts Chat room
 * https://developers.google.com/hangouts/chat/how-tos/webhooks#define_an_incoming_webhook
 */
const WEBHOOK_URL = 'ADD WEBHOOK URL HERE';

/**
 * Hangouts Chat user_id of primary contact
 * https://developers.google.com/hangouts/chat/reference/message-formats/basic#messages_that_mention_specific_users
 * Enables mentioning of a user for incidents that doesn't have HIGH severity
 * If you'd like to enable this feature, perform the following:
 * - Add the user_id on line 19
 * - Change the FALSE expression on line 55 to PRIMARY_CONTACT
 */
const PRIMARY_CONTACT = 'ADD USER_ID HERE'; // Optional

/**
 * Send message to Google Chat room
 * @param {Object} incident JSON object containing incident details
 * @return {Boolean} Boolean flag to check if posting is successful
 */
function postUpdate(incident) {
  // Set post flag to false
  let posted = false;

  // Destructe incident data
  const { begin, created, external_desc, ['most-recent-update']: update, severity, service_name, uri } = incident;

  // Parse dates
  const beginString = Utilities.formatDate(new Date(begin), 'GMT', 'MM-dd-yyyy HH:mm:ss z');
  const updateString = Utilities.formatDate(new Date(update.when), 'GMT', 'MM-dd-yyyy HH:mm:ss z');

  /**
   * Build Hangouts Chat simple message
   * https://developers.google.com/hangouts/chat/reference/message-formats/basic
   */
  let message = severity === 'high' ? '<users/all>' : '';
  const title = `*${external_desc.trim()}*`;
  const start = `\`Incident start\`: \`${beginString}\``;
  const upd = `\`Last update\`: \`${updateString}\``;
  const svc = `\`Service impacted\`: \`${service_name}\``;
  const sev = `\`Severity\`: \`${severity}\``;
  const link = `<https://status.cloud.google.com${uri}|Click here to access the incident page>`;

  // Truncate the update message to fit Chat message limit
  const txtLen = update.text.length;
  const text =
    txtLen < 3000
      ? update.text
      : update.text.substring(0, 3000) +
        `*---Message too long, truncating. See <https://status.cloud.google.com${uri}|incident page> for full details.---*`;

  // Build full message
  message += ` ${title}\n${start}\n${upd}\n${svc}\n${sev}\n${link}\n${text}`;

  // Build request parameters
  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      text: message,
    }),
  };

  // Sent POST request to webhook
  try {
    UrlFetchApp.fetch(WEBHOOK_URL, options);
    posted = true;
  } catch (err) {
    console.log(err);
  }
  return posted;
}

/**
 * Main function: RUN THIS!
 * Fetch GCP incidents via JSON feed
 */
function getIncidents() {
  const scriptProps = PropertiesService.getScriptProperties();
  const cachedDate = scriptProps.getProperty('lastPost');
  const lastPost = new Date(parseFloat(cachedDate) || 0);

  // LOGGING
  console.log(`Last post to Hangouts Chat: ${lastPost}`);
  console.log(`Fetching incidents ${GCP_JSON_FEED}...`);

  // Fetch items from RSS feed
  const response = UrlFetchApp.fetch(GCP_JSON_FEED).getContentText();
  const jsonResp = JSON.parse(response).reverse();

  // DEDUP: filter new items based on last post date
  const incidents = jsonResp.filter((jsonResponse) => {
    const lastUpdate = new Date(jsonResponse['most-recent-update'].when);
    if (lastUpdate.getTime() > lastPost.getTime()) return jsonResponse;
  });

  // LOGGING
  console.log(`Found ${jsonResp.length} incident(s): ${incidents.length} are new.`);

  // Iterate through each new item
  const postedIncidents = incidents.filter((incident) => {
    const updateDate = new Date(incident['most-recent-update'].when);
    // Post items to Hangouts Chat
    const posted = postUpdate(incident);
    // Update last post date property
    if (posted && updateDate.getTime() > lastPost.getTime()) {
      scriptProps.setProperty('lastPost', updateDate.getTime());
      return true;
    }
  });

  // LOGGING
  console.log(`${postedIncidents.length}/${incidents.length} incidents posted`);
}
