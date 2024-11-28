import React from "react";

const Todolist = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <header className="flex justify-between items-center mb-10 mt-20">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Bom dia, Usuário!</h1>
          <p className="text-sm text-gray-600">O que temos para hoje?</p>
        </div>
        <button className="flex items-center gap-2 bg-transparent text-gray-600 text-sm font-medium hover:text-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.5 6.5V19a1 1 0 01-.293.707l-3 3A1 1 0 018 21v-6.793l-6.5-6.5A1 1 0 011 6V4z"
            />
          </svg>
          Filtrar por categoria
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[{
          task: "Comprar bolo de aniversário",
          category: "pessoal",
          deadline: "05/12/24",
          completed: false,
        }, {
          task: "Levar o cachorro para passear",
          category: "pessoal",
          deadline: "05/12/24",
          completed: false,
        }, {
          task: "Lavar roupas",
          category: "casa",
          deadline: "05/12/24",
          completed: false,
        }, {
          task: "Organizar documentos RH",
          category: "trabalho",
          deadline: "05/12/24",
          completed: false,
        }, {
          task: "Planejar festa de aniversário",
          category: "pessoal",
          deadline: "05/12/24",
          completed: false,
        }, {
          task: "Estudar sobre a revolução francesa",
          category: "estudo",
          deadline: "10/12/24",
          completed: false,
        }, {
          task: "Revisar slide apresentação",
          category: "trabalho",
          deadline: "05/12/24",
          completed: false,
        }, {
          task: "Contatar técnico da internet",
          category: "casa",
          deadline: "05/12/24",
          completed: true,
        }].map((item, index) => (
          <div
            key={index}
            className="bg-indigo-100 rounded-lg shadow-md p-6 flex flex-col gap-4 w-full"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={item.completed}
                className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                readOnly
              />
              <span
                className={`text-sm font-medium text-gray-800 ${
                  item.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {item.task}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              <p>Data limite: {item.deadline}</p>
              <p>Categoria: {item.category}</p>
            </div>
            <button className="bg-indigo-500 text-white text-sm font-semibold rounded-md px-4 py-2 hover:bg-indigo-600">
              + adicionar pomodoro
            </button>
          </div>
        ))}
      </div>

      <footer className="flex justify-center gap-4 mt-12">
        <button className="bg-indigo-700 text-white font-semibold text-sm rounded-md px-6 py-3 hover:bg-indigo-800">
          Adicionar nova atividade
        </button>
        <button className="bg-indigo-700 text-white font-semibold text-sm rounded-md px-6 py-3 hover:bg-indigo-800">
          Gerenciar atividades
        </button>
      </footer>
    </div>
  );
};

export default Todolist;
