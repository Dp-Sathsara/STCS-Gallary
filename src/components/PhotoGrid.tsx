import React, { useMemo } from 'react';
import PhotoCard from './PhotoCard';
import { Pattern } from './PatternSelector';
type Photo = {
  id: string;
  imageUrl: string;
  title: string;
  patterns: Pattern[];
};
type PhotoGridProps = {
  photos: Photo[];
  selectedPatterns: Pattern[];
  onDeletePhoto: (id: string) => void;
  onPhotoClick?: (photo: Photo) => void;
};
const PhotoGrid: React.FC<PhotoGridProps> = ({
  photos,
  selectedPatterns,
  onDeletePhoto,
  onPhotoClick
}) => {
  // Filter photos based on selected patterns
  const filteredPhotos = useMemo(() => {
    if (selectedPatterns.length === 0) return photos;
    return photos.filter(photo => {
      return selectedPatterns.every(selectedPattern => {
        return photo.patterns.some(photoPattern => {
          if (selectedPattern.type === 'keyword' && photoPattern.type === 'keyword') {
            return photoPattern.value.toLowerCase().includes(selectedPattern.value.toLowerCase());
          }
          return photoPattern.type === selectedPattern.type && photoPattern.value === selectedPattern.value;
        });
      });
    });
  }, [photos, selectedPatterns]);
  if (filteredPhotos.length === 0) {
    return <div className="py-12 text-center">
        <p className="text-gray-500">No photos match your selected patterns.</p>
      </div>;
  }
  return <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {filteredPhotos.map(photo => <PhotoCard key={photo.id} id={photo.id} imageUrl={photo.imageUrl} title={photo.title} patterns={photo.patterns} onDelete={onDeletePhoto} onClick={() => onPhotoClick?.(photo)} />)}
    </div>;
};
export default PhotoGrid;