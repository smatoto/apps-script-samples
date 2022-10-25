/**
 * Build Google sheets custom menu items
 * @param {Object} e Google Sheets eventObject
 */
function onOpen(e: any) {
  const wow = 'test';
  SpreadsheetApp.getUi()
    .createMenu('Shared Drive Access')
    .addItem('Authorize', 'authorize')
    .addSeparator()
    .addItem('Get Permissions', 'getDrivePermissions')
    .addToUi();
}
