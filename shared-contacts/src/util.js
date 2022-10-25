/**
 * Write date to Google Sheets: headers must be within the values array
 * @param {String} sheet - name of the sheet
 * @param {Array} values - Array of values to write
 */
function writeSheet(sheetName, values) {
  const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const headers = sheetName == SYNC_SHEET_NAME ? SYNC_HEADERS : LIST_HEADERS;
  values.unshift(headers);
  ss.clearContents();
  ss.getRange(1, 1, values.length, values[0].length).setValues(values);
}

/**
 * Returns the list or Google Sheet cell values.
 * @param {String} sheetName name of sheet.
 * @return {Array} tabular data of sheet cells.
 */
function getEntries(sheetName) {
  const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  const values = ss.getRange(2, 1, ss.getLastRow() - 1, ss.getLastColumn()).getValues();
  return values.map(value => {
    return {
      firstName: value[0],
      lastName: value[1],
      fullName: value[2],
      email: value[3],
      phone: value[4],
      org: value[5],
      title: value[6],
      city: value[7],
      street: value[8],
      region: value[9],
      postcode: value[10],
      country: value[11],
      selfLink: value[12],
      operation: value[13],
    };
  });
}

/**
 * Build XML payload
 * @param {Object} entry contact details
 * @returns entry in atom format
 */
const buildPayload = entry => {
  const { firstName, lastName, fullName, email, org, title, phone, city, street, region, postcode, country } = entry;

  const xmlEntry = `<atom:entry xmlns:atom='http://www.w3.org/2005/Atom' xmlns:gd='http://schemas.google.com/g/2005'>
    <atom:category scheme='http://schemas.google.com/g/2005#kind' term='http://schemas.google.com/contact/2008#contact'/>
    <gd:name>
        <gd:givenName>${firstName}</gd:givenName>
        <gd:familyName>${lastName}</gd:familyName>
        <gd:fullName>${fullName}</gd:fullName>
    </gd:name>
    <gd:email rel='http://schemas.google.com/g/2005#work' primary='true' address='${email}' displayName='${firstName} ${lastName}'/>
    <gd:organization rel="http://schemas.google.com/g/2005#work" label="Work" primary="true">
    <gd:orgName>${org}</gd:orgName>
      <gd:orgTitle>${title}</gd:orgTitle>
    </gd:organization>
    <gd:phoneNumber rel='http://schemas.google.com/g/2005#work' primary='true'>${phone}</gd:phoneNumber>
    <gd:im address='${email}' protocol='http://schemas.google.com/g/2005#GOOGLE_TALK' primary='true' rel='http://schemas.google.com/g/2005#home'/>
    <gd:structuredPostalAddress rel='http://schemas.google.com/g/2005#work' primary='true'>"
      <gd:city>${city}</gd:city>
      <gd:street>${street}</gd:street>
      <gd:region>${region}</gd:region>
      <gd:postcode>${postcode}</gd:postcode>
      <gd:country>${country}</gd:country>
      <gd:formattedAddress>${street} ${city}</gd:formattedAddress>
    </gd:structuredPostalAddress>
    <atom:content type='text'>Notes</atom:content>
  </atom:entry>`;

  return xmlEntry;
};
