"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import ptBrLocale from "@fullcalendar/core/locales/pt";
import { getAtividades, updateAtividade } from "@/hooks/useAtividades"; // Função de update
import { useEffect, useState } from "react";
import IAtividade from "@/types/IAtividade";

const Calendar: React.FC = () => {
  const [atividades, setAtividades] = useState<IAtividade[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAtividade, setSelectedAtividade] = useState<IAtividade | null>(
    null
  );

  useEffect(() => {
    const fetchAtividades = async () => {
      const data = await getAtividades();
      setAtividades(data);
    };

    fetchAtividades();
  }, []);

  const handleEventClick = (eventInfo: any) => {
    const { id, title, start, end, color } = eventInfo.event;
    setSelectedAtividade({
      _id: id,
      name: title,
      inicioAtividade: start.toISOString(), // Converte para string
      fimAtividade: end.toISOString(), // Converte para string
      cor: color,
      isPommodoro: false,
      concluida: false,
      momentoConclusao: "",
      id_categoria: "",
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    if (!selectedAtividade) return;

    const {
      _id,
      name,
      inicioAtividade,
      fimAtividade,
      cor,
      isPommodoro,
      concluida,
      momentoConclusao,
      id_categoria,
    } = selectedAtividade;

    try {
      await updateAtividade(
        _id,
        new Date(inicioAtividade).toISOString(), // Converte para string
        new Date(fimAtividade).toISOString(), // Converte para string
        name,
        isPommodoro,
        cor,
        concluida,
        momentoConclusao,
        id_categoria
      );

      setAtividades((prev) =>
        prev.map((atividade) =>
          atividade._id === _id
            ? { ...atividade, name, inicioAtividade, fimAtividade, cor }
            : atividade
        )
      );

      console.log("Atividade atualizada com sucesso!");
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao atualizar a atividade:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEventDrop = async (eventInfo: any) => {
    const { id, start, end } = eventInfo.event;
    try {
      await updateAtividade(
        id,
        start.toISOString(),
        end.toISOString(),
        eventInfo.event.title, // Nome do evento
        eventInfo.event.extendedProps.isPommodoro,
        eventInfo.event.color,
        eventInfo.event.extendedProps.concluida,
        eventInfo.event.extendedProps.momentoConclusao,
        eventInfo.event.extendedProps.id_categoria
      );

      setAtividades((prev) =>
        prev.map((atividade) =>
          atividade._id === id
            ? {
                ...atividade,
                inicioAtividade: start.toISOString(),
                fimAtividade: end.toISOString(),
              }
            : atividade
        )
      );
      console.log("Atividade arrastada e atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar a atividade arrastada:", error);
    }
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md text-black relative">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]} // Verifique se interactionPlugin está incluído
        initialView="dayGridWeek"
        locale={ptBrLocale}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridWeek,dayGridDay",
        }}
        editable={true} // Isso deve permitir o arraste dos eventos
        selectable={true}
        droppable={true}
        events={atividades.map((atividade) => ({
          id: atividade._id,
          title: atividade.name,
          start: atividade.inicioAtividade,
          end: atividade.fimAtividade,
          color: atividade.cor,
        }))}
        eventDrop={handleEventDrop}
        eventClick={handleEventClick}
      />

      {/* Modal de Edição */}
      {isModalOpen && selectedAtividade && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Editar Atividade</h2>
            <div>
              <label className="block mb-2">Nome:</label>
              <input
                type="text"
                className="border p-2 w-full mb-4"
                value={selectedAtividade.name}
                onChange={(e) =>
                  setSelectedAtividade((prev) =>
                    prev ? { ...prev, name: e.target.value } : prev
                  )
                }
              />
            </div>
            <div>
              <label className="block mb-2">Início:</label>
              <input
                type="datetime-local"
                className="border p-2 w-full mb-4"
                value={selectedAtividade.inicioAtividade
                  .toString()
                  .slice(0, 16)} // Exclui os milissegundos e "Z"
                onChange={(e) =>
                  setSelectedAtividade((prev) =>
                    prev ? { ...prev, inicioAtividade: e.target.value } : prev
                  )
                }
              />
            </div>
            <div>
              <label className="block mb-2">Fim:</label>
              <input
                type="datetime-local"
                className="border p-2 w-full mb-4"
                value={selectedAtividade.fimAtividade.toString().slice(0, 16)} // Exclui os milissegundos e "Z"
                onChange={(e) =>
                  setSelectedAtividade((prev) =>
                    prev ? { ...prev, fimAtividade: e.target.value } : prev
                  )
                }
              />
            </div>
            <div>
              <label className="block mb-2">Cor:</label>
              <input
                type="color"
                className="w-full mb-4"
                value={selectedAtividade.cor}
                onChange={(e) =>
                  setSelectedAtividade((prev) =>
                    prev ? { ...prev, cor: e.target.value } : prev
                  )
                }
              />
            </div>
            <div className="flex justify-end">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2"
                onClick={handleSave}
              >
                Salvar
              </button>
              <button
                className="bg-gray-500 text-white py-2 px-4 rounded-md"
                onClick={handleCloseModal}
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
