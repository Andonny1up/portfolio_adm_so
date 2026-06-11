// Definimos el tipado esperado del JSON
type StudentData = {
  fullname: string;
  image_profile: string;
};

export type StudentSummary = {
  id: string;
  name: string;
  image_profile: string;
};

export const fetchStudents = async (): Promise<StudentSummary[]> => {
  // Usamos import.meta.glob de Vite para obtener todos los JSON de la carpeta
  const modules = import.meta.glob('../students/*.json');
  const students: StudentSummary[] = [];

  for (const path in modules) {
    const id = path.split('/').pop()?.replace('.json', '') || '';
    const module = await modules[path]() as { default: StudentData };
    
    students.push({ 
      id, 
      name: module.default.fullname, 
      image_profile: module.default.image_profile 
    });
  }

  return students;
};