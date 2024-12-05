"use client";
import React, { useState, useEffect } from "react";

function Pomodoro() {
  const [time, setTime] = useState(25 * 60); // Tempo inicial em segundos (25 minutos)
  const [isRunning, setIsRunning] = useState(false); // Indica se o timer está rodando
  const [mode, setMode] = useState<"Pomodoro" | "Pausa Curta" | "Pausa Longa">(
    "Pomodoro"
  ); // Define o modo
  const [isModalOpen, setIsModalOpen] = useState(false); // Controle do modal
  const [customTimes, setCustomTimes] = useState({
    Pomodoro: 25,
    "Pausa Curta": 5,
    "Pausa Longa": 15,
  }); // Tempos personalizados (em minutos)

  let timer: NodeJS.Timeout | null = null; // Declaração explícita do tipo

  // Atualiza o timer quando está rodando
  useEffect(() => {
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else if (timer) {
      clearInterval(timer);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isRunning]);

  // Alterna entre os modos
  const handleModeChange = (
    newMode: "Pomodoro" | "Pausa Curta" | "Pausa Longa"
  ) => {
    setIsRunning(false); // Pausa o timer ao mudar de modo
    setMode(newMode);
    setTime(customTimes[newMode] * 60); // Atualiza o tempo com base nos tempos personalizados
  };

  // Formata o tempo para exibição
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  // Atualiza os tempos personalizados no modal
  const handleCustomTimeChange = (
    mode: "Pomodoro" | "Pausa Curta" | "Pausa Longa",
    value: string
  ) => {
    const numericValue = Math.max(1, parseInt(value) || 0); // Define um valor mínimo de 1 minuto
    setCustomTimes((prev) => ({ ...prev, [mode]: numericValue }));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {/* Contêiner principal */}
      <div
        className="relative rounded-lg p-12 h-[23rem] w-[40rem] shadow-lg text-center"
        style={{ backgroundColor: "#728fce", color: "white" }}
      >
        <button
          className="absolute top-4 right-4 text-sm font-md px-4 py-2 rounded-md font-semibold hover:opacity-90"
          style={{ backgroundColor: "#485ca4", color: "white" }}
          onClick={() => setIsModalOpen(true)}
        >
          configurações
        </button>
        <div className="text-white mt-10 text-8xl font-bold">
          {formatTime(time)}
        </div>
        <button
          className="mt-10 font-semibold text-2xl h-14 w-52 rounded-lg hover:opacity-90"
          style={{ backgroundColor: "#485ca4", color: "white" }}
          onClick={() => setIsRunning(!isRunning)}
        >
          {isRunning ? "pausar" : "iniciar"}
        </button>
      </div>

      {/* Botões de Modo */}
      <div className="flex justify-center gap-12 mt-10 space-x-8">
        {(["Pomodoro", "Pausa Curta", "Pausa Longa"] as const).map(
          (btnMode) => (
            <button
              key={btnMode}
              className={`font-medium rounded-lg h-10 w-40 text-lg hover:opacity-90 ${
                mode === btnMode ? "bg-blue-800" : "bg-blue-600"
              }`}
              style={{ color: "white" }}
              onClick={() => handleModeChange(btnMode)}
            >
              {btnMode}
            </button>
          )
        )}
      </div>

      {/* Modal de Configurações */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-gray-800">
          <div className="bg-white rounded-lg p-8 w-[30rem]">
            <h2 className="text-2xl font-bold mb-4">Configurar Tempos</h2>
            {(["Pomodoro", "Pausa Curta", "Pausa Longa"] as const).map(
              (modalMode) => (
                <div key={modalMode} className="mb-4">
                  <label className="block text-lg font-medium mb-1">
                    {modalMode}
                  </label>
                  <input
                    type="number"
                    value={customTimes[modalMode]}
                    onChange={(e) =>
                      handleCustomTimeChange(modalMode, e.target.value)
                    }
                    className="w-full border rounded-md p-2"
                  />
                </div>
              )
            )}
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-400 text-white rounded-md px-4 py-2 hover:opacity-90"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-blue-600 text-white rounded-md px-4 py-2 hover:opacity-90"
                onClick={() => setIsModalOpen(false)}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pomodoro;
