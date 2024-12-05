"use client";

import React, { useEffect, useState } from "react";
import TaskItem from "./ItemTodo";
import { getAtividades, updateAtividade } from "@/hooks/useAtividades"; // Importar a função updateAtividade
import { getCategorias } from "@/hooks/useCategoria"; // Importar a função getCategorias
import IAtividade from "@/types/IAtividade";
import ICategoria from "@/types/ICategoria"; // Criar interface para categoria, caso não tenha

const Todolist = () => {
  const [atividades, setAtividades] = useState<IAtividade[]>([]);
  const [categorias, setCategorias] = useState<ICategoria[]>([]); // Estado para categorias

  useEffect(() => {
    const fetchAtividades = async () => {
      const data = await getAtividades();
      setAtividades(data);
    };

    const fetchCategorias = async () => {
      const data = await getCategorias();
      setCategorias(data);
    };

    fetchAtividades();
    fetchCategorias(); // Chama a função para obter categorias
  }, []);

  // Função para alternar a conclusão da atividade
  const handleCheckboxChange = async (
    atividadeId: string,
    concluida: boolean
  ) => {
    try {
      // Atualizar o estado da atividade como concluída ou não
      await updateAtividade(
        atividadeId,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        concluida
      );

      // Atualizar o estado local de atividades para refletir a mudança
      setAtividades((prev) =>
        prev.map((atividade) =>
          atividade._id === atividadeId
            ? { ...atividade, concluida: !concluida } // Inverte o valor de "concluida"
            : atividade
        )
      );
      console.log("Atividade atualizada com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar a atividade:", error);
    }
  };

  // Função para obter o nome da categoria a partir do ID
  const getCategoriaNome = (id: string) => {
    const categoria = categorias.find((cat) => cat._id === id);
    return categoria ? categoria.name : "Categoria desconhecida"; // Retorna "Categoria desconhecida" se não encontrar
  };

  const getCategoriaColor = (id: string) => {
    const categoria = categorias.find((cat) => cat._id === id);
    return categoria ? categoria.cor : "Categoria desconhecida";
  };

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
            category={getCategoriaNome(task.id_categoria)}
            deadline={task.fimAtividade}
            completed={task.concluida}
            onCheckboxChange={handleCheckboxChange}
            atividadeId={task._id}
            categoryColor={getCategoriaColor(task.id_categoria)}
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
