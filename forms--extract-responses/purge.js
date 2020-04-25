/**
 * Deletes responses on a Google Form based on timestamp stored in cache
 */
async function purgeResponses() {
  // Get timestamp from cache
  const cached = CacheService.getScriptCache().get('request-timestamp');
  const startTime = (await cached) !== null ? cached : null;

  // Create timestamp(Date) from string
  const timestamp = new Date(startTime);

  // LOGGING
  console.log(`Initiating deletion of responses from ${startTime}`);

  // Get the Form to extract responses from.
  const form = FormApp.getActiveForm();
  const responses = form.getResponses(timestamp);

  // Get Form response IDs
  const responseIds = responses.map((response) => response.getId());

  // Delete responses
  deleteResponses(true, responseIds); // comment out when debugging
}
