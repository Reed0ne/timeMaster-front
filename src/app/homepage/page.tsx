import React from "react";
import Homepage from "@/components/Homepage/Homepage";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";

const HomepagePage = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar activePage="home" />
      <Navbar />
      <div className="flex-1 bg-white p-4">
        <Homepage />
      </div>
    </div>
  );
};

export default HomepagePage;
