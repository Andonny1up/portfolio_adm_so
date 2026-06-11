
// Exportamos la interfaz para poder reutilizarla en otros lugares (como en Student.tsx)
export type PortfolioItem = {
  id: number;
  title: string;
  description: string;
  image_url: string;
};

type Props = {
  item: PortfolioItem;
};

const Card = ({ item }: Props) => {
  // Usaremos imágenes de marcador de posición (placeholder) si "image_url" viene vacío.
  const placeholderImage = `https://via.placeholder.com/600x400/e2e8f0/06b6d4?text=${encodeURIComponent(item.title)}`;

  return (
    <div className="relative overflow-hidden rounded-2xl p-[4px] shadow-lg max-w-[600px] w-full mx-auto group hover:-translate-y-2 hover:scale-[1.02] hover:-rotate-1 hover:shadow-2xl transition-all duration-500 ease-out">
      {/* Efecto moderno: Borde giratorio (Azul en claro, Esmeralda en oscuro) */}
      <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_270deg,#2563eb_360deg)] dark:bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_270deg,#10b981_360deg)] transition-colors duration-300" />
      
      {/* Contenedor principal de la tarjeta */}
      <div className="relative z-10 bg-white dark:bg-gray-800 rounded-xl overflow-hidden flex flex-col h-full transition-colors">
        {/* Imagen del proyecto (400px alto) */}
        <div className="w-full sm:h-[400px] h-[250px] overflow-hidden bg-gray-200 dark:bg-gray-700">
          <img 
            src={item.image_url || placeholderImage} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        
        {/* Detalles del proyecto */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-3 group-hover:text-blue-600 dark:group-hover:text-emerald-400 transition-colors">
            {item.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Card;