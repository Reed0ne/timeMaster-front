"use client";

import React, { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getRelatorio } from "@/hooks/useRelatorio";
import IRelatorio from "@/types/IRelatorio";

// Registre os componentes necessários do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Relatorio = () => {
  const [relatorio, setRelatorio] = useState<IRelatorio | null>(null);

  useEffect(() => {
    const fetchRelatorio = async () => {
      try {
        const data = await getRelatorio();
        setRelatorio(data);
      } catch (error) {
        console.error("Erro ao buscar relatório:", error);
      }
    };

    fetchRelatorio();
  }, []);

  // Dados do gráfico de barras
  const data = {
    labels: ["Semana Passada", "Essa Semana"], // Rótulos para as barras
    datasets: [
      {
        label: "Atividades Finalizadas",
        data: relatorio
          ? [
              relatorio.semanaPassada.atividadesConcluidas,
              relatorio.semanaAtual.atividadesConcluidas,
            ]
          : [0, 0],
        backgroundColor: "#525faa",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 1,
      },
      {
        label: "Pomodoros Utilizados",
        data: relatorio
          ? [
              relatorio.semanaPassada.atividadesPommodoro,
              relatorio.semanaAtual.atividadesPommodoro,
            ]
          : [0, 0],
        backgroundColor: "rgba(34, 197, 94, 0.6)",
        borderColor: "rgba(34, 197, 94, 1)",
        borderWidth: 1,
      },
      {
        label: "Atividades não finalizadas",
        data: relatorio
          ? [
              relatorio.semanaPassada.atividadesNaoConcluidas,
              relatorio.semanaAtual.atividadesNaoConcluidas,
            ]
          : [0, 0],
        backgroundColor: "#FF1919",
        borderColor: "#cc0000",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 pt-10">
      {/* Container Principal */}
      <div className="relative bg-white text-black rounded-lg p-8 w-[90%] max-w-4xl shadow-lg">
        {/* Fundo Claro */}
        <div className="absolute inset-0 bg-white rounded-lg -z-10 scale-105"></div>

        {/* Título e Ícone PDF */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-black">
            Bem-vindo(a) ao seu relatório semanal!
          </h1>
          <FaFilePdf className="text-3xl text-black" />
        </div>

        {/* Gráfico de Barras */}
        <div
          style={{
            height: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Bar data={data} />
        </div>

        {/* Cards de Relatório */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-12">
          {/* Card - Semana Passada */}
          <div className="bg-[#728fce] text-gray-800 rounded-lg shadow-md p-6 w-72 text-center">
            <h2 className="text-lg font-semibold mb-4">Semana passada</h2>
            <p className="text-sm font-bold mb-4">24 de novembro - 30 de novembro 2024</p>
            <ul className="text-sm space-y-2">
              <li>
                {relatorio?.semanaPassada.atividadesConcluidas
                  ? `${relatorio?.semanaPassada.atividadesConcluidas} atividades marcadas como finalizadas`
                  : "Sem dados sobre atividades finalizadas"}
              </li>
              <li>
                {relatorio?.semanaPassada.atividadesPommodoro
                  ? `Você utilizou o pomodoro ${relatorio?.semanaPassada.atividadesPommodoro} vezes`
                  : "Sem dados sobre pomodoros utilizados"}
              </li>
              <li>
                {relatorio?.semanaPassada.atividadesNaoConcluidas
                  ? `Você não finalizou ${relatorio?.semanaPassada.atividadesNaoConcluidas} atividades`
                  : "Sem dados sobre atividades não finalizadas"}
              </li>
            </ul>
          </div>

          {/* Card - Essa Semana */}
          <div className="bg-[#728fce] text-gray-800 rounded-lg shadow-md p-6 w-72 text-center">
            <h2 className="text-lg font-semibold mb-4">Essa semana</h2>
            <p className="text-sm font-bold mb-4">1 de dezembro - 7 de dezembro 2024</p>
            <ul className="text-sm space-y-2">
              <li>
                {relatorio?.semanaAtual.atividadesConcluidas
                  ? `${relatorio?.semanaAtual.atividadesConcluidas} atividades marcadas como finalizadas`
                  : "Sem dados sobre atividades finalizadas"}
              </li>
              <li>
                {relatorio?.semanaAtual.atividadesPommodoro
                  ? `Você utilizou o pomodoro ${relatorio?.semanaAtual.atividadesPommodoro} vezes`
                  : "Sem dados sobre pomodoros utilizados"}
              </li>
              <li>
                {relatorio?.semanaAtual.atividadesNaoConcluidas
                  ? `Você não finalizou ${relatorio?.semanaAtual.atividadesNaoConcluidas} atividades`
                  : "Sem dados sobre atividades não finalizadas"}
              </li>
            </ul>
          </div>
        </div>

        {/* Média Geral */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-12">
          <div className="bg-transparent text-center">
            <p className="text-sm text-black font-medium">
              Sua média geral foi:{" "}
              <span className="font-bold">
                {relatorio?.semanaPassada.atividadesConcluidasAntes ?? "Sem dados sobre atividades concluídas antes do prazo"}
              </span>
            </p>
          </div>
          <div className="bg-transparent text-center">
            <p className="text-sm text-black font-medium">
              Sua média geral foi:{" "}
              <span className="font-bold">
                {relatorio?.semanaAtual.atividadesConcluidasAntes ?? "Sem dados sobre atividades concluídas antes do prazo"}
              </span>
            </p>
          </div>
        </div>

        {/* Notificação */}
        <div className="mt-8 flex justify-center items-center gap-2">
          <p className="text-sm">
            Quero ser notificado quando um novo relatório estiver pronto
          </p>
          <input
            type="checkbox"
            className="toggle-checkbox h-5 w-5 border-2 border-purple-500 rounded-full bg-purple-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Relatorio;