/**
 * Delete a Domain Shared Contact
 * @param {string} contactId the domain shared contact ID
 * @param {number} rowNumber entry row number in sheet
 */
const deleteContact = selfLink => {
  const params = {
    method: 'delete',
    contentType: 'application/json',
    headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken(), 'GData-Version': '3.0', 'If-Match': '*' },
  };

  try {
    const resp = UrlFetchApp.fetch(selfLink, params);
    const respCode = resp.getResponseCode();
    return respCode == '201' || respCode == '200' ? 'OK' : 'FAILED';
  } catch (error) {
    return 'FAILED';
  }
};
