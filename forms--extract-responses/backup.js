/**
 * Create new Sheet to write responses to
 * @param {Object} data Object with sheet dimension data
 * @return {Boolean} Return true if backup is successful
 */
function writeSheet(e) {
  // Create new Google Sheet
  let sheetName = `${e.name} - ${e.date}`;
  let sheet = SpreadsheetApp.create(sheetName, e.row, e.col).getActiveSheet();

  // Write responses values
  let values = e.responses;
  sheet.getRange(1, 1, values.length, values[0].length).setValues(values);

  // LOGGING
  let sheetUrl = sheet.getParent().getUrl();
  console.log(
    `Saved ${values.length} responses from ${e.date} to sheet: ${sheetUrl}`
  );
  // Send boolean value for success
  return true;
}

/**
 * Split Form responses into separate sheets
 * @param   {Array}   formData Array of responses
 * @return  {Boolean} Return true if saved successfully
 */
function saveResponses(formData) {
  // Add timestamp to responses
  let responses = formData.responses;
  let dateString = Utilities.formatDate(
    formData.timestamp,
    Session.getScriptTimeZone(),
    'MM/dd/yyyy HH:mm:ss'
  );

  // Add headers to sheet values
  responses.unshift(formData.headers);

  // Create the new sheet and write responses
  return writeSheet({
    name: formData.sheetName,
    date: dateString,
    responses: responses,
    row: responses.length,
    col: responses[0].length
  });
}
