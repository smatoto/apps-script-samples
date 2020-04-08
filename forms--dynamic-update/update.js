// Update Choices
function updateChoices(item, data) {
  //  Build dropdown items
  let choices = data.map(function(datum) {
    return item.createChoice(datum[0]);
  });

  //  Set choices to Form
  if (choices) item.setChoices(choices);
}

function updateQuestion(question) {
  //  Get data from Spreadsheet dynamically
  let ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(question.sheet);
  let column = ss.getRange(question.range);

  //  Get all values, even empty ones
  let colVals = column.getValues();
  //  Filter rows of non-empty values
  let lastRow = colVals.filter(String).length;
  //  Get values from column excluding non-empty rows
  let data = ss.getRange(2, column.getColumn(), lastRow).getValues();

  //  Opem Form to update
  let form = FormApp.openById(question.formId);
  let items = form.getItems();

  //  Loop through questions
  items.map(function(item) {
    if (item.getTitle() == question.title) {
      updateChoices(item.asListItem(), data);
    }
  });
}

// Update Google Form
function updateForm() {
  //  Define questions to replace dropdown options for
  let questions = [
    {
      title: <Question Name>,
      sheet: <Sheet Name>,
      range: <Range in A1 notation>,
      formId: <Form ID>
    },
    {
      title: <Question Name>,
      sheet: <Sheet Name>,
      range: <Range in A1 notation>,
      formId: <Form ID>
    }
  ];

  // Update each question
  questions.map(function(question) {
    updateQuestion(question);
  });
}
