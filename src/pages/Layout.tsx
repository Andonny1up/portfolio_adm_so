import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  // Leemos el valor del localStorage al iniciar para recordar la preferencia del usuario
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <div className="relative min-h-screen font-sans text-gray-800 dark:text-gray-100 transition-colors duration-300 z-0">
      {/* --- EFECTO DE FONDO (Esferas modernas) --- */}
      <div className="fixed inset-0 pointer-events-none -z-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-500 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-300/30 dark:bg-cyan-900/30 blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-300/30 dark:bg-blue-900/30 blur-[100px] mix-blend-multiply dark:mix-blend-screen animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute top-[30%] left-[30%] w-[30vw] h-[30vw] rounded-full bg-emerald-300/20 dark:bg-emerald-900/20 blur-[80px] mix-blend-multiply dark:mix-blend-screen animate-[pulse_12s_ease-in-out_infinite]" />
      </div>

      {/* --- BOTÓN TOGGLE DE TEMA --- */}
      <div className="fixed top-4 right-4 z-50">
        <button 
          onClick={() => setIsDark(!isDark)}
          className="p-3 text-xl rounded-full bg-white/50 dark:bg-gray-800/50 shadow-lg backdrop-blur-md border border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700 transition-all hover:scale-110"
          title="Alternar tema"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>

      {/* Contenido de la página (Home o Student) */}
      <Outlet />
    </div>
  );
}