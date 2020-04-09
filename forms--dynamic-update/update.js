// Update Choices
function updateChoices(item, data) {
  //  Build dropdown items
  let choices = data.map((d) => item.createChoice(d[0]));

  //  Set choices to Form
  if (choices) item.setChoices(choices);
}

function updateQuestion(q) {
  //  Get data from Spreadsheet dynamically
  const ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(q.sheet);
  let column = ss.getRange(q.range);

  //  Get all values, even empty ones
  let colVals = column.getValues();
  //  Filter rows of non-empty values
  let lastRow = colVals.filter(String).length;
  //  Get values from column excluding non-empty rows
  let data = ss.getRange(2, column.getColumn(), lastRow).getValues();

  //  Opem Form to update
  let form = FormApp.openById(q.formId);
  let items = form.getItems();

  //  Loop through questions
  items.forEach((item) => {
    if (item.getTitle() == q.title) {
      updateChoices(item.asListItem(), data);
    }
  });
}

// Update Google Form
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
