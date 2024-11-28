import React from "react";

function Pomodoro() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div
        className="relative rounded-lg p-12 h-[23rem] w-[40rem] shadow-lg text-center"
        style={{ backgroundColor: "#728fce", color: "white" }}
      >
        <button
          className="absolute top-4 right-4 text-sm font-md px-4 py-2 rounded-md font-semibold hover:opacity-90"
          style={{ backgroundColor: "#485ca4", color: "white" }}
        >
          configurações
        </button>
        <div className="text-white mt-10 text-8xl font-bold">25:00</div>
        <button
          className="mt-10 font-semibold text-2xl h-14 w-52 rounded-lg hover:opacity-90"
          style={{ backgroundColor: "#485ca4", color: "white" }}
        >
          iniciar
        </button>
      </div>

      {/* Caixas de controle (fora do container) */}
      <div className="flex justify-center gap-12 mt-10 space-x-8">
        <button
          className="font-medium rounded-lg h-10 w-40 text-lg hover:opacity-90"
          style={{ backgroundColor: "#2F4499", color: "white" }}
        >
          Pomodoro
        </button>
        <button
          className="font-medium rounded-lg h-10 w-40 text-lg hover:opacity-90"
          style={{ backgroundColor: "#4964CC", color: "white" }}
        >
          Pausa curta
        </button>
        <button
          className="font-medium rounded-lg h-10 w-40 text-lg hover:opacity-90"
          style={{ backgroundColor: "#4964CC", color: "white" }}
        >
          Pausa longa
        </button>
      </div>
    </div>
  );
}

export default Pomodoro;
