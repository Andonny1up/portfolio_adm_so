import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card, { type PortfolioItem } from '../components/Card';

type SocialMedia = {
  id: number;
  title: string;
  url: string;
};

type StudentData = {
  fullname: string;
  image_profile: string;
  social_media: SocialMedia[];
  comment: string;
  portfolio: PortfolioItem[];
};

const Student = () => {
  const { id } = useParams<{ id: string }>();
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStudent = async (studentId: string) => {
      try {
        // Vite permite hacer imports dinámicos de archivos locales.
        const module = await import(`../students/${studentId}.json`);
        setStudentData(module.default);
      } catch (error) {
        console.error("No se pudo cargar el archivo del estudiante:", error);
        setStudentData(null);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadStudent(id);
    }
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center">
        <p className="text-xl font-medium text-gray-500 dark:text-gray-400 animate-pulse">Cargando portafolio...</p>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold text-red-500 mb-4">Estudiante no encontrado</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">El archivo para "{id}" no existe.</p>
        <Link to="/" className="bg-blue-600 dark:bg-emerald-500 text-white px-6 py-2 rounded-full hover:bg-blue-700 dark:hover:bg-emerald-600 transition-colors">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full p-8">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="inline-block text-blue-600 dark:text-emerald-400 hover:text-blue-800 dark:hover:text-emerald-300 font-medium mb-8 transition-colors">
          &larr; Volver al inicio
        </Link>
        
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-sm p-8 mb-12 border border-gray-100 dark:border-gray-700 transition-colors">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Imagen de perfil del estudiante si la provee en el JSON */}
            {studentData.image_profile && (
              <div className="w-48 h-48 md:w-56 md:h-56 shrink-0 rounded-3xl overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500 shadow-xl border-4 border-white dark:border-gray-800 bg-gray-200 dark:bg-gray-700">
                <img src={studentData.image_profile} alt={studentData.fullname} className="w-full h-full object-cover" />
              </div>
            )}
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-4">{studentData.fullname}</h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 border-l-4 border-blue-500 dark:border-emerald-500 pl-4 py-1 italic mb-6 transition-colors">
                "{studentData.comment}"
              </p>

              {/* Redes sociales */}
              {studentData.social_media && studentData.social_media.length > 0 && (
                <div className="flex flex-wrap justify-center md:justify-start gap-3">
                  {studentData.social_media.map((social) => (
                    <a key={social.id} href={social.url} target="_blank" rel="noopener noreferrer" className="bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 px-4 py-1.5 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm">
                      {social.title}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">Mi Portafolio</h2>
        
        {studentData.portfolio && studentData.portfolio.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {studentData.portfolio.map((item: PortfolioItem) => (
              <Card key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 dark:text-gray-400 text-center col-span-full py-12">
            Aún no hay proyectos en este portafolio.
          </p>
        )}
      </div>
    </div>
  )
}

export default Student;