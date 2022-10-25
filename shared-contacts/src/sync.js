/**
 * Synchronize Domain Shared Contacts
 */
const sync = () => {
  SpreadsheetApp.getActiveSpreadsheet().toast('Sync started', 'Status', 3);
  const entries = getEntries(SYNC_SHEET_NAME);
  const result = entries?.map(entry => {
    const { operation, selfLink } = entry;
    switch (operation.toLowerCase()) {
      case 'add':
        return { ...entry, result: add(entry) };
      case 'update':
        return { ...entry, result: update(entry) };
      case 'delete':
        return { ...entry, result: deleteContact(selfLink) };
      default:
        return { ...entry, result: 'Invalid operation' };
    }
  });
  const entryResults = result.map(result => {
    return [
      result.firstName,
      result.lastName,
      result.fullName,
      result.email,
      `="${result.phone}"`,
      result.org,
      result.title,
      result.city,
      result.street,
      result.region,
      result.postCode,
      result.country,
      result.selfLink,
      result.operation,
      result.result,
    ];
  });
  writeSheet('SYNC', entryResults);
  const ui = SpreadsheetApp.getUi();
  ui.alert('Sync complete', `Processed ${entryResults.length} contacts`, ui.ButtonSet.OK);
  Utilities.sleep(500);
  list();
};
