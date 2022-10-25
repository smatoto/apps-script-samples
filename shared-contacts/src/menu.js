/**
 * Add a custom menu to the active spreadsheet, including a separator and a sub-menu.
 * @param {object} e Sheets eventObject
 */
function onOpen(e) {
  SpreadsheetApp.getUi()
    .createMenu('Contacts')
    .addItem('Authorize', 'authorize')
    .addSeparator()
    .addItem('Sync contacts', 'confirmSync')
    .addItem('List contacts', 'list')
    .addToUi();
}

/**
 * Authorize user to use scripts
 */
const authorize = () => {
  SpreadsheetApp.getUi().alert('You are now authorized to run scripts.');
  // Call ContactsApp to prompt authorization
  const contacts = ContactsApp.getContacts();
};

/**
 * Bulk upload prompt
 */

function confirmSync() {
  const ui = SpreadsheetApp.getUi(); // Same variations.

  const result = ui.alert(
    'Please confirm',
    'This will add or modify external contacts on the Google Workspace Directory \nAre you sure you want to continue?',
    ui.ButtonSet.YES_NO,
  );

  // Process the user's response.
  if (result == ui.Button.YES) {
    // User clicked "Yes".
    sync();
  } else {
    // User clicked "No" or X in the title bar.
    ui.alert('Process aborted', 'User cancelled the operation', ui.ButtonSet.OK);
  }
}
