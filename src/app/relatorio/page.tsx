import React from "react";
import Relatorio from "@/components/Relatorio/Relatorio";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";

const RelatorioPage = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar activePage="relatorio" />
      <Navbar />
      <div className="flex-1 p-4">
        <Relatorio />
      </div>
    </div>
  );
};

export default RelatorioPage;
