// URL of Blog RSS feed
const GCP_JSON_FEED = 'https://status.cloud.google.com/incidents.json';
/**
 * Webhook URL of the Hangouts Chat room
 * https://developers.google.com/hangouts/chat/how-tos/webhooks#define_an_incoming_webhook
 */
const WEBHOOK_URL = 'ADD WEBHOOK URL HERE';

/**
 * Send message to Google Chat room
 * @param {Object} incident JSON object containing incident details
 * @return {Boolean} Boolean flag to check if posting is successful
 */
function postUpdate(incident) {
  // Set post flag to false
  let posted = false;

  // Destructe incident data
  const {
    begin,
    created,
    external_desc,
    ['most-recent-update']: update,
    service_name,
    uri
  } = incident;

  // Parse dates
  const beginString = Utilities.formatDate(
      new Date(begin),
      'GMT',
      'MM-dd-yyyy HH:mm:ss z'
  );
  const createdString = Utilities.formatDate(
      new Date(created),
      'GMT',
      'MM-dd-yyyy HH:mm:ss z'
  );

  /**
   * Build Hangouts Chat simple message
   * https://developers.google.com/hangouts/chat/reference/message-formats/basic
   */
  const title = `*${external_desc.trim()}*`;
  const start = `\`Incident start\`: \`${beginString}\``;
  const upd = `\`Last update\`: \`${createdString}\``;
  const svc = `\`Service impacted\`: \`${service_name}\``;
  const link = `<https://status.cloud.google.com${uri}|Click here to access the incident page>`;
  const message = `<users/all> ${title}\n${start}\n${upd}\n${svc}\n${link}\n${update.text}`;

  // Build request parameters
  const options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify({
      text: message
    })
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
  const jsonResp = JSON.parse(response);

  // Filter new items based on last post date
  const incidents = jsonResp.filter((jsonResponse) => {
    const created = new Date(jsonResponse.created);
    if (created.getTime() > lastPost.getTime()) return jsonResponse;
  });

  console.log(
      `Found ${jsonResp.length} incident(s): ${incidents.length} are new.`
  );

  // Iterate through each new item
  const postedIncidents = incidents.filter((incident) => {
    const createdDate = new Date(incident.created);
    // Post items to Hangouts Chat
    const posted = postUpdate(incident);
    // Update last post date property
    if (posted) {
      scriptProps.setProperty('lastPost', createdDate.getTime());
      return true;
    }
  });

  console.log(`${postedIncidents.length}/${incidents.length} incidents posted`);
}
