/**
 * List Domain Shared Contacts
 */
const list = () => {
  let next;
  let contacts = [];
  let index = 1;

  do {
    const params = {
      method: 'get',
      contentType: 'application/atom+xml',
      headers: { Authorization: `Bearer  ${ScriptApp.getOAuthToken()}`, 'GData-Version': '3.0' },
      muteHttpExceptions: true,
    };

    const response = UrlFetchApp.fetch(
      `https://www.google.com/m8/feeds/contacts/${DOMAIN}/full?alt=json&max-results=${MAX_RESULTS}&start-index=${index}`,
      params,
    );

    const responseCode = response.getResponseCode();
    const data = JSON.parse(response.getContentText());

    // Get next page details
    if (responseCode == '200' && data.feed) {
      const { link } = data.feed;
      next = link.filter(item => {
        return item.rel == 'next';
      });
    }
    // Increment index if next page
    if (next.length) index += MAX_RESULTS;

    // Get feed entries
    const { entry } = data.feed;
    entry?.forEach(ent => {
      // Empty contact object
      const contact = {};
      if (ent.gd$name) {
        contact.firstName = ent.gd$name.gd$givenName?.$t || ' ';
        contact.lastName = ent.gd$name.gd$familyName?.$t || ' ';
        contact.fullName = ent.gd$name.gd$fullName?.$t || ' ';
      }

      if (ent.gd$email) {
        contact.email = ent.gd$email[0].address || ' ';
      }

      if (ent.gd$phoneNumber) {
        contact.phone = ent.gd$phoneNumber[0]?.$t || ' ';
      }

      if (ent.gd$organization) {
        contact.org = ent.gd$organization[0].gd$orgName?.$t || ' ';
        contact.title = ent.gd$organization[0].gd$orgTitle?.$t || ' ';
      }

      if (ent.gd$structuredPostalAddress) {
        contact.street = ent.gd$structuredPostalAddress[0].gd$street?.$t || ' ';
        contact.city = ent.gd$structuredPostalAddress[0].gd$city?.$t || ' ';
        contact.region = ent.gd$structuredPostalAddress[0].gd$region?.$t || ' ';
        contact.postCode = ent.gd$structuredPostalAddress[0].gd$postCode?.$t || ' ';
        contact.country = ent.gd$structuredPostalAddress[0].gd$country?.$t || ' ';
      }
      // Get self link
      const selfLinkArray = ent.link.filter(item => {
        return item.rel == 'edit';
      });
      contact.id = selfLinkArray[0].href;

      contacts.push([
        contact.firstName,
        contact.lastName,
        contact.fullName,
        contact.email,
        '="' + contact.phone + '"',
        contact.org,
        contact.title,
        contact.city,
        contact.street,
        contact.region,
        contact.postCode,
        contact.country,
        contact.id,
      ]);
    });
  } while (next.length);
  writeSheet('LIST', contacts);
};
