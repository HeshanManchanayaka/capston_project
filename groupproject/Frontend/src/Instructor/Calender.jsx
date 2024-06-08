import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Eventcalendar, getJson, setOptions } from '@mobiscroll/react';
import { useEffect, useMemo, useState } from 'react';

setOptions({
  theme: 'ios',
  themeVariant: 'light'
});

function Calendar() {
  const [myEvents, setEvents] = useState([]);

  const myResponsive = useMemo(
    () => ({
      xsmall: {
        view: {
          calendar: { type: 'week' },
          agenda: { type: 'day' },
        },
      },
      custom: {
        // Custom breakpoint
        breakpoint: 600,
        view: {
          calendar: { labels: true },
        },
      },
    }),
    [],
  );

  useEffect(() => {
    getJson(
      'https://trial.mobiscroll.com/events/?vers=5',
      (events) => {
        setEvents(events);
      },
      'jsonp',
    );
  }, []);

  return (
    <Eventcalendar
      clickToCreate={false}
      dragToCreate={false}
      dragToMove={false}
      dragToResize={false}
      eventDelete={false}
      data={myEvents}
      responsive={myResponsive}
    />
  );
}

export default Calendar;