/**
 * Extract responses from Google Form
 * @param {Date} timestamp the earliest date and time for which form responses should be returned
 * @return {Object} Object with header, responses and timestamp data
 */
function getResponses(timestamp) {
  // Get the Form to extract responses from.
  const form = FormApp.getActiveForm();
  const responses = form.getResponses(timestamp);
  const timezone = Session.getScriptTimeZone();
  // Get Form items except section headers and page breaks
  const formItems = getFormItems(form.getItems());
  let responseIds = [];

  // Get Form question titles
  let formHeaders = getHeaders(formItems);

  // Get Form responses in tabular format (2D Array)
  let formResponses = responses.map(response => {
    // Get reponses for each Form Item
    let rowResponse = formItems.map(formItem =>
      response.getResponseForItem(formItem)
        ? response.getResponseForItem(formItem).getResponse()
        : ''
    );

    // Add response timestamp on the beginning of response
    let dateString = Utilities.formatDate(
      response.getTimestamp(),
      timezone,
      'MM/dd/yyyy HH:mm:ss'
    );
    rowResponse.unshift(dateString);

    // Add responseId to Cache Service array - will be used for deletion
    responseIds = responseIds.concat(response.getId());

    // Individual response in Array format
    return rowResponse;
  });

  // Return Form data object
  return {
    timestamp: timestamp,
    headers: formHeaders,
    responses: formResponses,
    responseIds: responseIds
  };
}

/**
 * RUN THIS!
 * Beginning of script
 * Get responses by timestamp
 */
function extractResponses() {
  // Specify name for Sheets backup file
  const newSheetName = 'Extracted Responses';
  // Set timestamp
  const startTime = 'April 11, 2020 12:00:00';
  const timestamp = new Date(startTime);

  // Get responses and save to Sheets
  let formData = getResponses(timestamp);

  // Get responseIds and remove from formData object - will be used for deletion
  let responseIds = formData.responseIds;
  delete formData.responseIds;

  // Add sheetName to formData object
  formData.sheetName = newSheetName;
  // Save responses to Sheet
  let saved = saveResponses(formData);

  // DEBUG
  respCount = formData.responses.length;
  console.log(`Time: ${timestamp}\nResponses: ${respCount} found`);

  // Delete responses that were saved on Sheets
  // deleteResponses(saved, responseIds); // comment out when debugging
}
