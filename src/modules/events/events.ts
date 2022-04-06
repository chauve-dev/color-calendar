import { EventData } from "../../types";

export function getEventsData() {
  return JSON.parse(JSON.stringify(this.eventsData));
}

/** Set new events data array */
export function setEventsData(events: EventData[]) {
  this.eventsData = JSON.parse(JSON.stringify(events));
  this.setDate(this.currentDate);
  return this.eventsData.length;
}

/** Add events to existing events data array */
export function addEventsData(newEvents: EventData[] = []) {
  const eventAddedCount = this.eventsData.push(...newEvents);
  this.setDate(this.currentDate);
  return eventAddedCount;
}

export function getDateEvents(date: Date) {
  let filteredEventsThisDate = this.filteredEventsThisMonth.filter(
    (event: EventData) => {
      const start = new Date(event.start);
      const end = new Date(event.end);
      start.setHours(0);
      start.setMinutes(0)
      end.setHours(0);
      end.setMinutes(0);
      const currentMonth = this.currentDate.getMonth();
      const startDate = new Date(end);
      startDate.setDate(1);
      console.log(
          start,
          end,
          startDate
      )
      if((start.getMonth() !== end.getMonth() || start.getFullYear() !== end.getFullYear()) && currentMonth === end.getMonth()) {
          return date.getTime() >= startDate.getTime() && date.getTime() <= end.getTime();
      } else {
          return date.getTime() >= start.getTime() && date.getTime() <= end.getTime();
      }
    }
  );
  return filteredEventsThisDate;
}

export function getMonthEvents() {
  return this.filteredEventsThisMonth;
}
