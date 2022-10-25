/**
 * Update an existing Domain Shared Contact
 * @param {Object} contact
 */
const update = contact => {
  // Replace empty props
  // Object.keys(contact).forEach(key => {
  //   if (!contact[key]) {
  //     contact[key] = '-';
  //   }
  // });

  // Build request parameters
  const params = {
    method: 'put',
    payload: buildPayload(contact),
    contentType: 'application/atom+xml',
    headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken(), 'GData-Version': '3.0', 'If-Match': '*' },
    muteHttpExceptions: true,
  };

  try {
    const resp = UrlFetchApp.fetch(contact.selfLink, params);
    const respCode = resp.getResponseCode();
    return respCode == '201' || respCode == '200' ? 'OK' : 'FAILED';
  } catch (error) {
    return 'FAILED';
  }
};
