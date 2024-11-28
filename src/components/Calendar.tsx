'use client';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import ptBrLocale from '@fullcalendar/core/locales/pt'; // Localidade correta para pt-br

const Calendar: React.FC = () => {
  return (
    <div className="p-4 bg-white rounded-md shadow-md text-black">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridWeek"
        locale={ptBrLocale} // Definindo o idioma
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridWeek,dayGridDay',
        }}
        editable={true}
        selectable={true}
        events={[
          { title: 'Evento o dia todo', start: '2024-11-25' },
          { title: 'Conferência', start: '2024-11-26', end: '2024-11-28' },
          { title: 'Festa de Aniversário', start: '2024-11-30T07:00:00' },
        ]}
      />
    </div>
  );
};

export default Calendar;
