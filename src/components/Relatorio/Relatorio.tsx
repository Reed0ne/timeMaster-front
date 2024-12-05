"use client";

import React from "react";
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
  // Dados do gráfico de barras
  const data = {
    labels: ["Semana Passada", "Essa Semana"], // Rótulos para as barras
    datasets: [
      {
        label: "Atividades Finalizadas", // Título da barra
        data: [10, 2], // Dados para as barras (Semana Passada, Essa Semana)
        backgroundColor: "#525faa", // Cor da barra
        borderColor: "rgba(99, 102, 241, 1)", // Cor da borda da barra
        borderWidth: 1,
      },
      {
        label: "Pomodoros Utilizados", // Título da segunda barra
        data: [4, 1], // Dados para as barras (Semana Passada, Essa Semana)
        backgroundColor: "rgba(34, 197, 94, 0.6)", // Cor da barra
        borderColor: "rgba(34, 197, 94, 1)", // Cor da borda da barra
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 pt-10">
      {/* Container Principal */}
      <div className="relative bg-[#728fce] text-white rounded-lg p-8 w-[90%] max-w-4xl">
        {/* Fundo Lilás Claro */}
        <div className="absolute inset-0 bg-purple-200 rounded-lg -z-10 scale-105"></div>

        {/* Título e Ícone PDF */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">
            Bem-vindo(a) ao seu relatório semanal!
          </h1>
          <FaFilePdf className="text-3xl" />
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
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          {/* Card - Semana Passada */}
          <div className="bg-gray-100 text-gray-800 rounded-lg shadow-md p-6 w-72 text-center">
            <h2 className="text-lg font-semibold mb-4">Semana passada</h2>
            <p className="text-sm mb-2">10 de novembro - 16 de novembro 2024</p>
            <ul className="text-sm space-y-2">
              <li>10 atividades marcadas como finalizadas</li>
              <li>Você utilizou o pomodoro 4 vezes</li>
              <li>Você não finalizou 6 atividades</li>
              <li>A categoria mais utilizada por você foi: trabalho</li>
            </ul>
          </div>

          {/* Card - Essa Semana */}
          <div className="bg-gray-100 text-gray-800 rounded-lg shadow-md p-6 w-72 text-center">
            <h2 className="text-lg font-semibold mb-4">Essa semana</h2>
            <p className="text-sm mb-2">10 de novembro - 16 de novembro 2024</p>
            <ul className="text-sm space-y-2">
              <li>2 atividades marcadas como finalizadas</li>
              <li>Você utilizou o pomodoro 1 vez</li>
              <li>Você não finalizou 6 atividades</li>
              <li>A categoria mais utilizada por você foi: pessoal</li>
            </ul>
          </div>
        </div>

        {/* Média Geral */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-4">
          <div className="bg-transparent text-center">
            <p className="text-sm text-white font-medium">
              Sua média geral foi: <span className="font-bold">X</span>
            </p>
          </div>
          <div className="bg-transparent text-center">
            <p className="text-sm text-white font-medium">
              Sua média geral foi: <span className="font-bold">X</span>
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
