// Update Choices
function updateChoices(item, data) {
  //  Build dropdown items
  let choices = data.map(function(datum) {
    return item.createChoice(datum[0]);
  });

  //  Set choices to Form
  if (choices) item.setChoices(choices);
}

// Update Google Form
function updateForm() {
  //  Call PropertiesService
  let scriptProps = PropertiesService.getScriptProperties();
  //  Define question to replace options for
  let question = {
    title: scriptProps.getProperty("title"),
    sheet: scriptProps.getProperty("sheet"),
    range: scriptProps.getProperty("range"),
    formId: scriptProps.getProperty("formId"),
  };

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
