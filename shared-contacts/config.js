/**
 * DO NOT MODIFY THESE VALUES!
 */
DOMAIN = Session.getEffectiveUser().getEmail().split('@')[1];
SYNC_SHEET_NAME = 'SYNC';
LIST_SHEET_NAME = 'LIST';
START_INDEX = 1;
MAX_RESULTS = 1000;
LIST_HEADERS = [
  'First Name',
  'Last Name',
  'Full Name',
  'Email',
  'Phone',
  'Company',
  'Job Title',
  'City',
  'Street',
  'Region',
  'Post Code',
  'Country',
  'Self Link',
];

SYNC_HEADERS = [
  'First Name',
  'Last Name',
  'Full Name',
  'Email',
  'Phone',
  'Company',
  'Job Title',
  'City',
  'Street',
  'Region',
  'Post Code',
  'Country',
  'Self Link',
  'Operation',
  'Result',
];
