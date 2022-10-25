/**
 * Fetch events from a list of Google Calendars
 * @return {Array} Array of objects containing calendarNames and events
 */
const getEvents = (): Array<object> => {
  const today = new Date();

  let eventsToday = [];

  // Iterate through each calendar and check for events today
  calIds.filter((calId: any) => {
    const calendar = CalendarApp.getCalendarById(calId);
    const events = calendar.getEventsForDay(today);
    console.log(`Calendar ${calendar.getName()} Event Count: ${events.length}`);
    if (events.length)
      eventsToday = eventsToday.concat({
        calendar: calendar.getName(),
        events: events,
      });
  });

  return eventsToday;
};
