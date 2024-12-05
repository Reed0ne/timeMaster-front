"use client";

import React, { useEffect, useState } from "react";
import TaskItem from "./ItemTodo";
import { getAtividades } from "@/hooks/useAtividades";
import IAtividade from "@/types/IAtividade";

const Todolist = () => {
  const [atividades, setAtividades] = useState<IAtividade[]>([]);

  useEffect(() => {
    const fetchAtividades = async () => {
      const data = await getAtividades();
      setAtividades(data);
    };

    fetchAtividades();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">
      <header className="flex justify-between items-center mb-10 mt-20">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Bom dia, Usuário!
          </h1>
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
        {atividades.map((task, index) => (
          <TaskItem
            key={index}
            task={task.name}
            category={task.id_categoria}
            deadline={task.fimAtividade}
            completed={task.concluida}
          />
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
