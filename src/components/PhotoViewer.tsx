import React from 'react';
import { XIcon, ExternalLinkIcon, FilterIcon } from 'lucide-react';
import { Pattern } from './PatternSelector';
import { TagIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
type PhotoViewerProps = {
  isOpen: boolean;
  onClose: () => void;
  photo: {
    imageUrl: string;
    title: string;
    patterns: Pattern[];
  } | null;
};
const PhotoViewer: React.FC<PhotoViewerProps> = ({
  isOpen,
  onClose,
  photo
}) => {
  const navigate = useNavigate();
  if (!isOpen || !photo) return null;
  const openInNewWindow = () => {
    window.open(photo.imageUrl, '_blank');
  };
  const handlePatternClick = (pattern: Pattern) => {
    onClose();
    navigate('/gallery', {
      state: {
        filterPattern: pattern
      }
    });
  };
  return <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4 transition-opacity">
      <div className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden">
        <div className="absolute top-4 right-4 flex gap-2 z-10">
          <button onClick={openInNewWindow} className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75" title="View in new window">
            <ExternalLinkIcon size={20} />
          </button>
          <button onClick={onClose} className="p-2 rounded-full bg-black bg-opacity-50 text-white hover:bg-opacity-75" title="Close">
            <XIcon size={20} />
          </button>
        </div>
        <div className="relative">
          <img src={photo.imageUrl} alt={photo.title} className="w-full h-auto" />
        </div>
        <div className="p-4 bg-white">
          <h3 className="text-lg font-semibold text-gray-900">{photo.title}</h3>
          {photo.patterns.length > 0 && <div className="mt-2 flex flex-wrap gap-2">
              {photo.patterns.map(pattern => <button key={pattern.id} onClick={() => handlePatternClick(pattern)} className="flex items-center bg-gray-100 rounded-full px-3 py-1 hover:bg-gray-200 transition-colors group">
                  {pattern.type === 'color' ? <div className="w-3 h-3 rounded-full mr-2" style={{
              backgroundColor: pattern.value
            }} /> : pattern.type === 'shape' ? <TagIcon className="w-3 h-3 text-indigo-500 mr-2" /> : <span className="text-purple-600 mr-1">#</span>}
                  <span className="text-sm text-gray-700">
                    {pattern.type === 'color' ? pattern.value : pattern.value}
                  </span>
                  <FilterIcon className="w-3 h-3 ml-1 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>)}
            </div>}
        </div>
      </div>
    </div>;
};
export default PhotoViewer;