/**
 * Write OCR text to Google Sheets
 * @param  {Object} sheet The responses sheet details
 * @param  {String} text The OCR text to write
 */
function writeSheet(sheet, text) {
  // Get the spreadsheet and writeSheet the OCR text
  const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet.name);
  ss.getRange(sheet.row, sheet.col).setValue(text);
}

/**
 * Get OCR text from uploaded Drive image
 * @param  {String} imageId A unique opaque ID for each Drive file
 * @return {String} The extracted OCR text
 */
function getOcrText(imageId) {
  // Get Vision API credentials
  const props = PropertiesService.getScriptProperties();
  const apiKey = props.getProperty('apiKey');
  const baseUrl = 'https://vision.googleapis.com/v1/images';

  // Build API endpoint URL
  let apiEndpoint = `${baseUrl}:annotate?key=${apiKey}`;

  // Fetch Drive image data
  let imageUrl = `https://drive.google.com/uc?export=view&id=${imageId}`;

  let imageBytes = UrlFetchApp.fetch(imageUrl).getContent();
  // Build request payload
  let payload = JSON.stringify({
    requests: [
      {
        image: {
          content: Utilities.base64Encode(imageBytes)
        },
        features: [
          {
            type: 'TEXT_DETECTION',
            maxResults: 10
          }
        ]
      }
    ]
  });

  // Send request to Vision API
  let resp = UrlFetchApp.fetch(apiEndpoint, {
    method: 'POST',
    contentType: 'application/json',
    payload: payload,
    muteHttpExceptions: true
  }).getContentText();

  // Fetch and parse Vision API response
  let data = JSON.parse(resp);
  let text = data.responses[0].textAnnotations[0].description;

  // Return extracted OCR text
  return text;
}

/**
 * Get Google Form event object on submission
 * @param {Object} e The Google Form event object
 */
function onFormSubmit(e) {
  // Define Google Sheet responses details
  const sheet = {
    name: '<Sheet Name>',
    col: '<Column Number>',
    row: e.range.rowStart // Prevent issues with concurrent uploads
  };

  // Define Google Form question item
  const formQuestion = '<Form Question Name>';

  // Get uploaded image ID
  let imageUrl = e.namedValues[formQuestion][0];
  let imageId = imageUrl.substring(33, imageUrl.length);

  // Extract OCR text from uploaded image
  let ocrText = getOcrText(imageId);

  // Write OCR text to Google Sheets
  writeSheet(sheet, ocrText);
}
