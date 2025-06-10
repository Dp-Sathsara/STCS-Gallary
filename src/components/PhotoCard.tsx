import React, { useState } from 'react';
import { Pattern } from './PatternSelector';
import { HeartIcon, TrashIcon, TagIcon } from 'lucide-react';
type PhotoCardProps = {
  id: string;
  imageUrl: string;
  title: string;
  patterns: Pattern[];
  onDelete?: (id: string) => void;
  onClick?: () => void;
};
const PhotoCard: React.FC<PhotoCardProps> = ({
  id,
  imageUrl,
  title,
  patterns,
  onDelete,
  onClick
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const handleClick = (e: React.MouseEvent) => {
    // Prevent click when clicking on action buttons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    onClick?.();
  };
  return <div className="relative overflow-hidden rounded-lg shadow-sm bg-white cursor-pointer" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} onClick={handleClick}>
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" />
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-gray-800 truncate">{title}</h3>
        {patterns.length > 0 && <div className="mt-1 flex flex-wrap gap-1">
            {patterns.slice(0, 3).map(pattern => <div key={pattern.id} className="flex items-center">
                {pattern.type === 'color' ? <div className="w-2 h-2 rounded-full mr-1" style={{
            backgroundColor: pattern.value
          }}></div> : pattern.type === 'shape' ? <TagIcon className="w-3 h-3 text-indigo-500 mr-1" /> : <span className="text-xs text-purple-600 mr-1">#</span>}
                <span className="text-xs text-gray-500">
                  {pattern.type === 'keyword' ? pattern.value : pattern.type === 'shape' ? pattern.value : ''}
                </span>
              </div>)}
            {patterns.length > 3 && <span className="text-xs text-gray-500">
                +{patterns.length - 3}
              </span>}
          </div>}
      </div>
      {/* Overlay actions */}
      <div className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity flex items-center justify-center gap-3 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <button onClick={() => setIsFavorite(!isFavorite)} className={`p-2 rounded-full ${isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-700'} hover:scale-110 transition-transform`}>
          <HeartIcon size={16} />
        </button>
        {onDelete && <button onClick={() => onDelete(id)} className="p-2 rounded-full bg-white text-gray-700 hover:text-red-500 hover:scale-110 transition-transform">
            <TrashIcon size={16} />
          </button>}
      </div>
    </div>;
};
export default PhotoCard;