import { useState } from 'react';
import { createPortal } from 'react-dom';

export type PortfolioImage = {
  id: number;
  image_url: string;
};

// Exportamos la interfaz para poder reutilizarla en otros lugares (como en Student.tsx)
export type PortfolioItem = {
  id: number;
  title: string;
  description: string;
  image_url: string;
  images?: PortfolioImage[];
};

type Props = {
  item: PortfolioItem;
};

const Card = ({ item }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Usaremos imágenes de marcador de posición (placeholder) si "image_url" viene vacío.
  const placeholderImage = `https://via.placeholder.com/600x400/e2e8f0/06b6d4?text=${encodeURIComponent(item.title)}`;

  // Calculamos las imágenes a mostrar: Si existe el array lo usamos, sino, creamos uno con la imagen principal.
  const galleryImages = item.images && item.images.length > 0 
    ? item.images 
    : [{ id: 0, image_url: item.image_url || placeholderImage }];

  const openGallery = () => {
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl p-[4px] shadow-lg max-w-[600px] w-full mx-auto group hover:-translate-y-2 hover:scale-[1.02] hover:-rotate-1 hover:shadow-2xl transition-all duration-500 ease-out">
      {/* Efecto moderno: Borde giratorio (Azul en claro, Esmeralda en oscuro) */}
      <div className="absolute top-1/2 left-1/2 w-[200%] h-[200%] -translate-x-1/2 -translate-y-1/2 animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_270deg,#2563eb_360deg)] dark:bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,transparent_270deg,#10b981_360deg)] transition-colors duration-300" />
      
      {/* Contenedor principal de la tarjeta */}
      <div className="relative z-10 bg-white dark:bg-gray-800 rounded-xl overflow-hidden flex flex-col h-full transition-colors">
        {/* Imagen del proyecto (400px alto) */}
        <div 
          className="relative w-full sm:h-[400px] h-[250px] overflow-hidden bg-gray-200 dark:bg-gray-700 cursor-pointer group/overlay"
          onClick={openGallery}
        >
          <img 
            src={item.image_url || placeholderImage} 
            alt={item.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Overlay para indicar que es clickeable (Aparece al pasar el cursor) */}
          <div className="absolute inset-0 flex items-center justify-center bg-transparent group-hover/overlay:bg-black/30 transition-all duration-300 z-20">
             <span className="opacity-0 group-hover/overlay:opacity-100 text-white bg-black/60 px-5 py-2.5 rounded-full font-medium backdrop-blur-sm transition-all duration-300 transform translate-y-4 group-hover/overlay:translate-y-0">
               {galleryImages.length > 1 ? 'Ver galería' : 'Ampliar imagen'}
             </span>
          </div>
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

      {/* --- Lightbox / Modal Renderizado en Portal --- */}
      {isModalOpen && createPortal(
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Botón de cerrar */}
          <button 
            className="absolute top-4 right-6 text-white/70 hover:text-white text-5xl font-light z-[60] transition-colors"
            onClick={() => setIsModalOpen(false)}
          >
            &times;
          </button>

          {/* Imagen central */}
          <div className="relative w-full max-w-5xl max-h-[90vh] flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img 
              src={galleryImages[currentImageIndex].image_url} 
              alt={`${item.title} - ${currentImageIndex + 1}`} 
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl select-none"
            />
            
            {/* Controles de navegación condicionales (si hay más de 1 imagen) */}
            {galleryImages.length > 1 && (
              <>
                <button 
                  className="absolute left-2 sm:-left-16 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xl sm:text-2xl transition-all border border-white/20 hover:scale-110"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
                  }}
                >
                  &#10094;
                </button>
                <button 
                  className="absolute right-2 sm:-right-16 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white rounded-full w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-xl sm:text-2xl transition-all border border-white/20 hover:scale-110"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImageIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
                  }}
                >
                  &#10095;
                </button>
                
                {/* Indicador del número de foto actual */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/80 font-medium text-sm bg-black/50 px-4 py-1 rounded-full backdrop-blur-sm">
                  {currentImageIndex + 1} / {galleryImages.length}
                </div>
              </>
            )}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Card;