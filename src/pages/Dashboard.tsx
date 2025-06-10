import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import PatternSelector from '../components/PatternSelector';
import PhotoGrid from '../components/PhotoGrid';
import UploadModal from '../components/UploadModal';
import PhotoViewer from '../components/PhotoViewer';
import { Pattern } from '../components/PatternSelector';
import { PlusIcon, LayoutGridIcon, FilterIcon } from 'lucide-react';
// Mock data for demonstration purposes
const mockPhotos = [{
  id: '1',
  imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
  title: 'Mountain Landscape',
  patterns: [{
    id: 'p1',
    type: 'color' as const,
    value: '#60A5FA'
  }, {
    id: 'p2',
    type: 'keyword' as const,
    value: 'nature'
  }]
}, {
  id: '2',
  imageUrl: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
  title: 'Forest Path',
  patterns: [{
    id: 'p3',
    type: 'color' as const,
    value: '#34D399'
  }, {
    id: 'p4',
    type: 'shape' as const,
    value: 'triangle'
  }]
}, {
  id: '3',
  imageUrl: 'https://images.unsplash.com/photo-1497436072909-60f360e1d4b1',
  title: 'Sunset View',
  patterns: [{
    id: 'p5',
    type: 'color' as const,
    value: '#F87171'
  }, {
    id: 'p6',
    type: 'keyword' as const,
    value: 'sunset'
  }]
}, {
  id: '4',
  imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07',
  title: 'Beach Day',
  patterns: [{
    id: 'p7',
    type: 'color' as const,
    value: '#FBBF24'
  }, {
    id: 'p8',
    type: 'shape' as const,
    value: 'circle'
  }]
}, {
  id: '5',
  imageUrl: 'https://images.unsplash.com/photo-1518173946395-e7f3d0956bd9',
  title: 'City Lights',
  patterns: [{
    id: 'p9',
    type: 'color' as const,
    value: '#A78BFA'
  }, {
    id: 'p10',
    type: 'keyword' as const,
    value: 'urban'
  }]
}, {
  id: '6',
  imageUrl: 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3',
  title: 'Night Sky',
  patterns: [{
    id: 'p11',
    type: 'color' as const,
    value: '#000000'
  }, {
    id: 'p12',
    type: 'keyword' as const,
    value: 'stars'
  }]
}];
const Dashboard = () => {
  const [photos, setPhotos] = useState(mockPhotos);
  const [selectedPatterns, setSelectedPatterns] = useState<Pattern[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof mockPhotos)[0] | null>(null);
  const handleDeletePhoto = (id: string) => {
    setPhotos(photos.filter(photo => photo.id !== id));
  };
  const handleUploadPhoto = (title: string, file: File | null, patterns: Pattern[]) => {
    if (!file) return;
    // In a real app, we would upload the file to a server
    // For now, we'll create a local URL
    const newPhoto = {
      id: `new-${Date.now()}`,
      imageUrl: URL.createObjectURL(file),
      title,
      patterns
    };
    setPhotos([newPhoto, ...photos]);
  };
  return <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Your Photos</h1>
            <p className="text-sm text-gray-500">
              Organize and filter your photos with magic patterns
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-2">
            <button onClick={() => setShowMobileFilters(!showMobileFilters)} className="sm:hidden inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <FilterIcon className="h-4 w-4 mr-2" />
              Filters
            </button>
            <button onClick={() => setIsUploadModalOpen(true)} className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
              <PlusIcon className="h-4 w-4 mr-2" />
              Upload Photo
            </button>
          </div>
        </div>
        <div className={`sm:block ${showMobileFilters ? 'block' : 'hidden'}`}>
          <PatternSelector selectedPatterns={selectedPatterns} onPatternSelect={pattern => setSelectedPatterns([...selectedPatterns, pattern])} onPatternRemove={patternId => setSelectedPatterns(selectedPatterns.filter(p => p.id !== patternId))} />
        </div>
        <PhotoGrid photos={photos} selectedPatterns={selectedPatterns} onDeletePhoto={handleDeletePhoto} onPhotoClick={photo => setSelectedPhoto(photo)} />
      </main>
      <UploadModal isOpen={isUploadModalOpen} onClose={() => setIsUploadModalOpen(false)} onUpload={handleUploadPhoto} />
      <PhotoViewer isOpen={!!selectedPhoto} onClose={() => setSelectedPhoto(null)} photo={selectedPhoto} />
    </div>;
};
export default Dashboard;