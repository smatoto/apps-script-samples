/**
 * Build and update the Google Form item choice
 * @param {ListItem} item the list item to update
 * @param {Array} data Array string of choices from Sheets
 */
function updateChoices(item, data) {
  //  Build dropdown items
  const choices = data.map((d) => item.createChoice(d[0]));

  //  Set choices to Form
  if (choices) item.setChoices(choices);
}

/**
 * Fetch the item choices based on question and Sheet range provided
 * @param {Array} q Array of question objects
 */
function updateQuestion(q) {
  //  Get data from Spreadsheet dynamically
  const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(q.sheet);
  const column = ss.getRange(q.range);

  //  Get all values, even empty ones
  const colVals = column.getValues();
  //  Filter rows of non-empty values
  const lastRow = colVals.filter(String).length;
  //  Get values from column excluding non-empty rows
  const data = ss.getRange(2, column.getColumn(), lastRow).getValues();

  //  Opem Form to update
  const form = FormApp.openById(q.formId);
  const items = form.getItems();

  //  Loop through questions
  items.forEach((item) => {
    if (item.getTitle() === q.title) {
      updateChoices(item.asListItem(), data);
    }
  });
}

/**
 * Main function: RUN THIS!
 * Update the Google Form
 */
function updateForm() {
  //  Define questions to replace dropdown options for
  const questions = [
    {
      title: '<Question Name>',
      sheet: '<Sheet Name>',
      range: '<Range in A1 notation>',
      formId: '<Form ID>'
    },
    {
      title: '<Question Name>',
      sheet: '<Sheet Name>',
      range: '<Range in A1 notation>',
      formId: '<Form ID>'
    }
  ];

  // Update each question
  questions.forEach((q) => updateQuestion(q));
}
