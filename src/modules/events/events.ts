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
      const currentMonth = this.currentDate.getMonth();
      if(start.getMonth() !== end.getMonth() && currentMonth === end.getMonth()) {
          let startDate = new Date(
              `${end.getFullYear()}-${("0" + end.getMonth()).slice(-2)}-01T${("0" + end.getHours()).slice(-2)}:${("0" + end.getMinutes()).slice(-2)}:${("0" + end.getSeconds()).slice(-2)}`
          );
          if (
              date.getDate() >= startDate.getDate() && date.getDate() <= end.getDate()
          ) {
              return true;
          } else {
              return false;
          }
      } else {
          if (
              date.getDate() >= start.getDate() && date.getDate() <= end.getDate()
          ) {
              return true;
          } else {
              return false;
          }
      }
    }
  );
  return filteredEventsThisDate;
}

export function getMonthEvents() {
  return this.filteredEventsThisMonth;
}
