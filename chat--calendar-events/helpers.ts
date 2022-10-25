/**
 * Main function: RUN THIS!
 * Send Google Chat notifications for Calendar events
 */
const sendNotifications = () => {
  // Get events from Google Calendar
  const events = getEvents();
  if (events.length) sendChat(events);
};
