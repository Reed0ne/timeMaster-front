"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import ptBrLocale from "@fullcalendar/core/locales/pt";
import {
  createAtividade,
  getAtividades,
  updateAtividade,
} from "@/hooks/useAtividades"; // Função de update
import { useEffect, useState } from "react";
import IAtividade from "@/types/IAtividade";
import ICategoria from "@/types/ICategoria"; // Adicione um tipo para categorias
import { getCategorias } from "@/hooks/useCategoria";

const Calendar: React.FC = () => {
  const [atividades, setAtividades] = useState<IAtividade[]>([]);
  const [categorias, setCategorias] = useState<ICategoria[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAtividade, setSelectedAtividade] = useState<IAtividade | null>(
    null
  );

  useEffect(() => {
    const fetchAtividades = async () => {
      const data = await getAtividades();
      setAtividades(data);
    };

    const fetchCategorias = async () => {
      // Adicione aqui sua lógica para buscar categorias
      const response = await getCategorias();
      setCategorias(response);
    };

    fetchAtividades();
    fetchCategorias();
  }, []);

  const handleEventClick = (eventInfo: any) => {
    const { id, title, start, end, color } = eventInfo.event;
    setSelectedAtividade({
      _id: id,
      name: title,
      inicioAtividade: start ? start.toISOString() : "",
      fimAtividade: end ? end.toISOString() : "",
      cor: color,
      isPommodoro: false,
      concluida: false,
      momentoConclusao: "",
      id_categoria: "",
    });
    setIsModalOpen(true);
  };

  const handleDateClick = (dateInfo: any) => {
    setSelectedAtividade({
      _id: "",
      name: "",
      inicioAtividade: dateInfo.dateStr,
      fimAtividade: dateInfo.dateStr,
      cor: "#000000", // Cor padrão
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
      if (_id) {
        // Atualizar evento existente
        await updateAtividade(
          _id,
          new Date(inicioAtividade).toISOString(),
          new Date(fimAtividade).toISOString(),
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
      } else {
        // Criar novo evento
        const createdEvent = await createAtividade(
          selectedAtividade.inicioAtividade,
          selectedAtividade.fimAtividade,
          selectedAtividade.name,
          selectedAtividade.isPommodoro,
          selectedAtividade.cor,
          selectedAtividade.concluida,
          selectedAtividade.momentoConclusao,
          selectedAtividade.id_categoria
        );

        setAtividades((prev) => [...prev, createdEvent]);
      }

      console.log("Atividade salva com sucesso!");
      handleCloseModal();
    } catch (error) {
      console.error("Erro ao salvar a atividade:", error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAtividade(null);
  };

  const handleEventDrop = async (eventInfo: any) => {
    const { id, start, end } = eventInfo.event;
    try {
      await updateAtividade(
        id,
        start.toISOString(),
        end.toISOString(),
        eventInfo.event.title,
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

  const handleCreateNewActivity = () => {
    setSelectedAtividade({
      _id: "",
      name: "",
      inicioAtividade: new Date().toISOString(), // Data atual
      fimAtividade: new Date().toISOString(),
      cor: "#000000", // Cor padrão
      isPommodoro: false,
      concluida: false,
      momentoConclusao: "",
      id_categoria: "",
    });
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md text-black relative">
      <button
        className="bg-blue-900 hover:bg-blue-700 text-white py-2 px-4 rounded-md mb-4 absolute right-44"
        onClick={handleCreateNewActivity}
      >
        Criar Nova Atividade
      </button>


      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
        initialView="dayGridWeek"
        locale={ptBrLocale}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridWeek,dayGridDay",
        }}
        editable={true}
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
        dateClick={handleDateClick} // Permite adicionar eventos em espaços vazios
      />

      {/* Modal de Edição ou Criação */}
      {isModalOpen && selectedAtividade && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md w-1/3">
            <h2 className="text-2xl font-semibold mb-4">
              {selectedAtividade._id ? "Editar Atividade" : "Criar Atividade"}
            </h2>
            {/* Campos do Modal */}
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
                value={selectedAtividade.inicioAtividade.slice(0, 16)}
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
                value={selectedAtividade.fimAtividade.slice(0, 16)}
                onChange={(e) =>
                  setSelectedAtividade((prev) =>
                    prev ? { ...prev, fimAtividade: e.target.value } : prev
                  )
                }
              />
            </div>
            <div>
              <label className="block mb-2">Categoria:</label>
              <select
                className="border p-2 w-full mb-4"
                value={selectedAtividade.id_categoria}
                onChange={(e) =>
                  setSelectedAtividade((prev) =>
                    prev ? { ...prev, id_categoria: e.target.value } : prev
                  )
                }
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((categoria) => (
                  <option key={categoria._id} value={categoria._id}>
                    {categoria.name}
                  </option>
                ))}
              </select>
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
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
