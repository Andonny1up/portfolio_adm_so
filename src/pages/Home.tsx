import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchStudents, type StudentSummary } from '../utils/getStudents';

const Home = () => {
  const [students, setStudents] = useState<StudentSummary[]>([]);

  useEffect(() => {
    const loadStudents = async () => {
      const data = await fetchStudents();
      setStudents(data);
    };

    loadStudents();
  }, []);

  return (
    <div className="w-full">
      {/* --- SECCIÓN 1: Hero --- */}
      <section className="flex flex-col items-center justify-center min-h-[60vh] p-8 py-20 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-blue-700 dark:text-gray-100 drop-shadow-sm transition-colors">
          Portafolio de Adm. de Sistemas Operativos (ASO 100)
        </h1>
        <p className="max-w-2xl mx-auto text-xl mb-10 text-gray-600 dark:text-gray-300 transition-colors">
          Este proyecto expone los trabajos y avances de los estudiantes de primer semestre de la gestión 1/2026, 
          donde demuestran los conocimientos adquiridos en la materia a través de productos reales.
        </p>
        <a 
          href="#portafolios" 
          className="bg-blue-600 dark:bg-emerald-500 text-white font-semibold px-8 py-3 rounded-full hover:bg-blue-700 dark:hover:bg-emerald-600 hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg text-lg"
        >
          Ver portafolios
        </a>
      </section>

      {/* --- SECCIÓN 2: Docente --- */}
      <section className="max-w-4xl mx-auto p-8 mb-16 bg-white/60 dark:bg-gray-900/60 backdrop-blur-lg shadow-sm border border-gray-200 dark:border-gray-800 rounded-3xl transition-colors">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
          {/* Foto del docente con forma cuadrada, bordes redondeados y un pequeño giro */}
          <div className="shrink-0">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-3xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500 shadow-xl border-4 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700">
              <img src="https://github.com/andonny1up.png" alt="Docente" className="object-cover w-full h-full" />
            </div>
          </div>
          {/* Información del docente */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-3xl font-bold mb-2 dark:text-gray-100 transition-colors">Ing. Andoni Barba Noe</h2>
            <h3 className="text-lg font-medium text-blue-600 dark:text-emerald-400 mb-4 transition-colors">Docente de la Materia</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors leading-relaxed">
              Encargado de guiar a los estudiantes a través de los conceptos fundamentales de los sistemas operativos, combinando la teoría con la práctica.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/andoni-barba-noe-894460184" target='_blank' className="bg-blue-100 text-blue-700 dark:bg-emerald-900/30 dark:text-emerald-400 px-5 py-2 rounded-lg font-medium hover:bg-blue-200 dark:hover:bg-emerald-800/40 transition-colors">LinkedIn</a>
              <a href="https://github.com/andonny1up" target='_blank' className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 px-5 py-2 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">GitHub</a>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN 3: Enlaces al Portafolio (Estudiantes) --- */}
      <section id="portafolios" className="max-w-6xl mx-auto p-4 pb-16">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-700 dark:text-gray-200">Nuestros Estudiantes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {students.map((student) => (
            <div key={student.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-xl shadow-sm hover:shadow-lg transition-all p-6 flex flex-col items-center border border-gray-100 dark:border-gray-700 hover:-translate-y-1">
              {/* Añadimos 'overflow-hidden' para que la imagen se recorte en forma de círculo */}
              <div className="w-20 h-20 bg-blue-100 text-blue-600 dark:bg-emerald-900/30 dark:text-emerald-400 rounded-full mb-4 flex items-center justify-center text-2xl font-bold transition-colors overflow-hidden">
                {student.image_profile ? (
                  <img src={student.image_profile} alt={student.name} className="w-full h-full object-cover" />
                ) : (
                  student.name.charAt(0)
                )}
              </div>
              <h3 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-100">{student.name}</h3>
              <Link to={`/student/${student.id}`} className="bg-blue-600 dark:bg-emerald-500 text-white px-6 py-2 rounded-full hover:bg-blue-700 dark:hover:bg-emerald-600 transition-colors w-full text-center">
                Ir al portafolio
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;