import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { Eventcalendar, getJson, setOptions, Popup, Button, Input, Datepicker } from '@mobiscroll/react';
import { useEffect, useMemo, useState } from 'react';

setOptions({
  theme: 'ios',
  themeVariant: 'light'
});

function Calendar() {
  const [myEvents, setEvents] = useState([]);
  const [isOpen, setOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventData, setEventData] = useState({
    title: '',
    start: '',
    end: ''
  });
  const [selectedDate, setSelectedDate] = useState(null);

  const myResponsive = useMemo(
    () => ({
      xsmall: {
        view: {
          calendar: { type: 'week' },
          agenda: { type: 'day' },
        },
      },
      custom: {
        breakpoint: 600,
        view: {
          calendar: { labels: true },
        },
      },
    }),
    []
  );

  useEffect(() => {
    getJson(
      'https://trial.mobiscroll.com/events/?vers=5',
      (events) => {
        setEvents(events);
      },
      'jsonp'
    );
  }, []);

  const handleEventClick = (event) => {
    setSelectedEvent(event.event);
    setEventData({
      title: event.event.title,
      start: event.event.start,
      end: event.event.end
    });
    setOpen(true);
  };

  const handleEventDelete = () => {
    setEvents(myEvents.filter(event => event.id !== selectedEvent.id));
    setOpen(false);
  };

  const handleEventSave = () => {
    if (selectedEvent) {
      // Update event
      setEvents(myEvents.map(event => event.id === selectedEvent.id ? { ...event, ...eventData } : event));
    } else {
      // Add new event
      setEvents([...myEvents, { ...eventData, id: new Date().getTime() }]);
    }
    setOpen(false);
  };

  const handleEventCreate = (event) => {
    setEventData({
      title: '',
      start: event.start,
      end: event.end
    });
    setSelectedEvent(null);
    setOpen(true);
  };

  const handleDateClick = (event) => {
    setSelectedDate(event.date);
  };

  const handleAddClick = () => {
    setEventData({
      title: '',
      start: selectedDate,
      end: selectedDate
    });
    setSelectedEvent(null);
    setOpen(true);
  };

  const handleDateChange = (event) => {
    setEventData({
      ...eventData,
      start: event.value[0],
      end: event.value[1]
    });
  };

  return (
    <div>
      <Eventcalendar
        clickToCreate={false}
        dragToCreate={true}
        dragToMove={true}
        dragToResize={true}
        eventDelete={true}
        data={myEvents}
        responsive={myResponsive}
        onEventClick={handleEventClick}
        onDayClick={handleDateClick}
      />
      {selectedDate && (
        <div style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 1000 }}>
          <Button onClick={handleAddClick}>+add</Button>
        </div>
      )}
      <Popup isOpen={isOpen} onClose={() => setOpen(false)}>
        <div>
          <div className="mbsc-form-group">
            <Input
              label="Title"
              value={eventData.title}
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
            />
            <Datepicker
              label="Date & Time Range"
              select="range"
              controls={['date', 'time']}
              dateFormat="YYYY-MM-DD"
              timeFormat="HH:mm"
              value={[eventData.start, eventData.end]}
              onChange={handleDateChange}
            />
          </div>
          <div className="mbsc-button-group">
            <Button onClick={handleEventSave}>Save</Button>
            {selectedEvent && <Button color="danger" onClick={handleEventDelete}>Delete</Button>}
            <Button onClick={() => setOpen(false)}>Cancel</Button>
          </div>
        </div>
      </Popup>
    </div>
  );
}

export default Calendar;
