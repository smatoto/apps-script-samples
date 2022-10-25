/**
 * Write OCR text to Google Sheets
 * @param  {any} sheet The responses sheet details
 * @param  {string} text The OCR text to write
 */
function writeSheet(sheet: any, text: String) {
  // Get the spreadsheet and writeSheet the OCR text
  const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheet.name);
  ss.getRange(sheet.row, sheet.col).setValue(text);
}

/**
 * Get OCR text from uploaded Drive image
 * @param  {string} imageId A unique opaque ID for each Drive file
 * @return {string} The extracted OCR text
 */
function getOcrText(imageId: string) {
  // Get Vision API credentials
  const props = PropertiesService.getScriptProperties();
  const apiKey = props.getProperty('apiKey');
  const baseUrl = 'https://vision.googleapis.com/v1/images';

  // Build API endpoint URL
  const apiEndpoint = `${baseUrl}:annotate?key=${apiKey}`;

  // Fetch Drive image data
  const imageUrl = `https://drive.google.com/uc?export=view&id=${imageId}`;

  const imageBytes = UrlFetchApp.fetch(imageUrl).getContent();
  // Build request payload
  const payload = JSON.stringify({
    requests: [
      {
        image: {
          content: Utilities.base64Encode(imageBytes),
        },
        features: [
          {
            type: 'TEXT_DETECTION',
            maxResults: 10,
          },
        ],
      },
    ],
  });

  // Send request to Vision API
  const resp = UrlFetchApp.fetch(apiEndpoint, {
    method: 'POST',
    contentType: 'application/json',
    payload: payload,
    muteHttpExceptions: true,
  }).getContentText();

  // Fetch and parse Vision API response
  const data = JSON.parse(resp);
  const text = data.responses[0].textAnnotations[0].description;

  // Return extracted OCR text
  return text;
}

/**
 * Get Google Form event object on submission
 * @param {Object} e The Google Form event object
 */
function onFormSubmit(e: any) {
  const name = '<Sheet Name>';
  const col = '<Column Number>';
  // Define Google Sheet responses details
  const sheet = {
    name,
    col,
    row: e.range.rowStart, // Prevent issues with concurrent uploads
  };

  // Define Google Form question item
  const formQuestion = '<Form Question Name>';

  // Get uploaded image ID
  const imageUrl = e.namedValues[formQuestion][0];
  const imageId = imageUrl.substring(33, imageUrl.length);

  // Extract OCR text from uploaded image
  const ocrText = getOcrText(imageId);

  // Write OCR text to Google Sheets
  writeSheet(sheet, ocrText);
}
