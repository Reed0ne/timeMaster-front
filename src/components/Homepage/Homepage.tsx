import React from 'react';
import Calendar from '@/components/Calendar';

const HomePage = () => {
  return (
    <div className="flex">
      <main className="flex-1 bg-white p-6">
        <h1 className="text-2xl font-bold mb-4">Início</h1>
        <Calendar />
      </main>
    </div>
  );
};

export default HomePage;
