import React from "react";
import Pomodoro from "@/components/Pomodoro/Pomodoro";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";

const PomodoroPage = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar activePage="pomodoro" />
      <Navbar />
      <div className="flex-1 p-4">
        <Pomodoro />
      </div>
    </div>
  );
};

export default PomodoroPage;
