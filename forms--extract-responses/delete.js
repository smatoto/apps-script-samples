/**
 * Deletes responses on a Google Form
 * @param {Boolean} saved flag to verify if backup is complete
 * @param {Array} responsesIds Array of responseIds from Form responses
 */
function deleteResponses(saved, responseIds) {
  if (saved === true) {
    responseIds.forEach(Id => FormApp.getActiveForm().deleteResponse(Id));
    console.log(`Deleted ${responseIds.length} responses`);
  }
}

/**
 * Get Form Items excluding section headers and page breaks
 * @param  {Form} form Form Object
 * @return {Array} Array of items
 */
function getFormItems(items) {
  return items.filter(
    item => item.getType() != 'SECTION_HEADER' && item.getType() != 'PAGE_BREAK'
  );
}

/**
 * Get Sheet headers from Forms question titles
 * @param  {Array} responses Array of responses
 * @return {Array} Array of strings of header text
 */
function getHeaders(items) {
  // Get title for each Form items
  let headers = items.map(question => question.getTitle());
  // Add timestamp to headers
  headers.unshift('Timestamp');
  return headers;
}
