import React from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faClock, faList, faBook, faMoon } from '@fortawesome/free-solid-svg-icons';

type SidebarProps = {
  activePage: string;
};

const Sidebar = ({ activePage }: SidebarProps) => {
  return (
    <aside className="w-64 bg-blue-700 text-white min-h-screen">
      <h2 className="text-2xl font-bold text-center py-6"></h2>
      <nav>
        <ul className="space-y-7 py-10">
          <li className={`px-10 py-3 flex items-center ${activePage === 'home' ? 'bg-blue-900' : ''}`}>
            <FontAwesomeIcon icon={faHome} className="w-5 h-5 mr-3" />
            <Link href="/homepage">
              <span className="text-lg px-3">Início</span>
            </Link>
          </li>
          <li className={`px-10 py-3 flex items-center ${activePage === 'pomodoro' ? 'bg-blue-900' : ''}`}>
            <FontAwesomeIcon icon={faClock} className="w-5 h-5 mr-3" />
            <Link href="/pomodoro">
              <span className="text-lg px-3">Pomodoro</span>
            </Link>
          </li>
          <li className={`px-10 py-3 flex items-center ${activePage === 'todolist' ? 'bg-blue-900' : ''}`}>
            <FontAwesomeIcon icon={faList} className="w-5 h-5 mr-3" />
            <Link href="/todolist">
              <span className="text-lg px-3">To-Do List</span>
            </Link>
          </li>
          <li className={`px-10 py-3 flex items-center ${activePage === 'relatorio' ? 'bg-blue-900' : ''}`}>
            <FontAwesomeIcon icon={faBook} className="w-5 h-5 mr-3" />
            <Link href="/relatorio">
              <span className="text-lg px-3">Relatório</span>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="absolute bottom-0 w-full px-10 py-7 flex items-center">
        <FontAwesomeIcon icon={faMoon} className="w-5 h-5 mr-3" />
        <span className="text-lg px-3">Modo Escuro</span>
      </div>
    </aside>
  );
};

export default Sidebar;
