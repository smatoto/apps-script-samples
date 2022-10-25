/**
 * Create a new Domain Shared Contact
 * @param {Object} contact
 * @returns {Boolean} operation success or failure
 */
const add = contact => {
  // Replace empty props
  // Object.keys(contact).forEach(key => {
  //   if (!contact[key]) {
  //     contact[key] = '-';
  //   }
  // });

  // Build request parameters
  const params = {
    method: 'post',
    payload: buildPayload(contact),
    contentType: 'application/atom+xml',
    headers: { Authorization: 'Bearer ' + ScriptApp.getOAuthToken(), 'GData-Version': '3.0' },
    muteHttpExceptions: true,
  };

  try {
    const resp = UrlFetchApp.fetch(`https://www.google.com/m8/feeds/contacts/${DOMAIN}/full`, params);
    const respCode = resp.getResponseCode();
    return respCode == '201' || respCode == '200' ? 'OK' : 'FAILED';
  } catch (error) {
    return 'FAILED';
  }
};
