/**
 * Write date to Google Sheets: headers must be within the values array
 * @param {String} sheet - name of the sheet
 * @param {Array} values - Array of values to write
 */
const writeSheet = (sheet: string, values: any) => {
  checkSheet();
  const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet);
  ss.clearContents();
  ss.getRange(1, 1, values.length, values[0].length).setValues(values);
};

/**
 * Authorize user to use scripts
 */
const authorize = () => {
  SpreadsheetApp.getUi().alert('You are now authorized to run scripts.');
};

/**
 * Check if Permissions sheet exists
 */
const checkSheet = () => {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Permissions');
  if (sheet) {
    console.log('Sheet exists');
  } else {
    SpreadsheetApp.getActiveSpreadsheet().insertSheet('Permissions');
  }
};
