import React from "react";
import Todolist from "@/components/Todolist/Todolist";
import Sidebar from "@/components/Sidebar/Sidebar";
import Navbar from "@/components/Navbar/Navbar";

const TodolistPage = () => {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar activePage="todolist" />
      <Navbar />
      <div className="flex-1 p-4">
        <Todolist />
      </div>
    </div>
  );
};

export default TodolistPage;
