/**
 * List all shared drives within a domain
 * @return {Array} array of shared drive Ids
 */
const listSharedDrives = (): Array<any> => {
  const drivesList: Array<object> = [];
  let pageToken: any;
  const fields = 'nextPageToken,items(id,name)';

  do {
    const { items, nextPageToken } = Drive.Drives.list({
      fields,
      pageToken,
      maxResults: 100,
      useDomainAdminAccess: true,
    });
    if (items) {
      items.forEach(({ id, name }) => drivesList.push({ id, name }));
    } else {
      console.log('No shared drives found.');
      break;
    }
    pageToken = nextPageToken;
  } while (pageToken);

  console.log(drivesList);
  return drivesList;
};
