/**
 * Get all shared drive permissions and write to sheet
 */
const getDrivePermissions = () => {
  // Request helpers
  let permissions = [];
  let pageToken: string;
  const fields = 'nextPageToken,items(name,emailAddress,role,type)';

  // Build headers
  const headers = ['Shared Drive Name', 'User / Group Name', 'Email Address', 'Role', 'Resource Type'];
  permissions.push(headers);

  //   Get shared drives
  const drives = listSharedDrives();

  // Get permissions for each shared drive
  drives.forEach((drive) => {
    do {
      const { items, nextPageToken } = Drive.Permissions.list(drive.id, {
        fields,
        pageToken,
        maxResults: 100,
        supportsAllDrives: true,
        useDomainAdminAccess: true,
      });
      if (items) {
        items.forEach((item) => permissions.push([drive.name, item.name, item.emailAddress, item.role, item.type]));
      } else {
        console.log(`No permissions found for ${drive.name}`);
      }
      pageToken = nextPageToken;
    } while (pageToken);
  });

  // Write permission details to sheet
  writeSheet('Permissions', permissions);
};
