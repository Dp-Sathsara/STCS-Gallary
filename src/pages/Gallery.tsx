import React, { useEffect, useMemo, useState } from 'react';
import Navbar from '../components/Navbar';
import PhotoCard from '../components/PhotoCard';
import PhotoViewer from '../components/PhotoViewer';
import { Pattern } from '../components/PatternSelector';
import { GridIcon, ColumnsIcon, FilterIcon } from 'lucide-react';
import PatternSelector from '../components/PatternSelector';
import { useLocation } from 'react-router-dom';
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
}, {
  id: '7',
  imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
  title: 'Tropical Beach',
  patterns: [{
    id: 'p13',
    type: 'color' as const,
    value: '#60A5FA'
  }, {
    id: 'p14',
    type: 'keyword' as const,
    value: 'beach'
  }]
}, {
  id: '8',
  imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
  title: 'Snowy Mountains',
  patterns: [{
    id: 'p15',
    type: 'color' as const,
    value: '#F472B6'
  }, {
    id: 'p16',
    type: 'shape' as const,
    value: 'triangle'
  }]
}, {
  id: '9',
  imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
  title: 'Foggy Forest',
  patterns: [{
    id: 'p17',
    type: 'color' as const,
    value: '#6B7280'
  }, {
    id: 'p18',
    type: 'keyword' as const,
    value: 'fog'
  }]
}];
type ViewMode = 'grid' | 'columns';
const Gallery = () => {
  const [selectedPatterns, setSelectedPatterns] = useState<Pattern[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<(typeof mockPhotos)[0] | null>(null);
  const location = useLocation();
  // Handle pattern filtering from PhotoViewer
  useEffect(() => {
    const filterPattern = location.state?.filterPattern;
    if (filterPattern) {
      setSelectedPatterns([filterPattern]);
      setShowFilters(true);
      // Clear the location state
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);
  // Filter photos based on selected patterns
  const filteredPhotos = useMemo(() => {
    if (selectedPatterns.length === 0) return mockPhotos;
    return mockPhotos.filter(photo => {
      return selectedPatterns.every(selectedPattern => {
        return photo.patterns.some(photoPattern => {
          if (selectedPattern.type === 'keyword' && photoPattern.type === 'keyword') {
            return photoPattern.value.toLowerCase().includes(selectedPattern.value.toLowerCase());
          }
          return photoPattern.type === selectedPattern.type && photoPattern.value === selectedPattern.value;
        });
      });
    });
  }, [selectedPatterns]);
  return <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Gallery</h1>
            <p className="text-sm text-gray-500">
              Browse and discover your photo collection
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-2">
            <button onClick={() => setShowFilters(!showFilters)} className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              <FilterIcon className="h-4 w-4 mr-2" />
              Filters
            </button>
            <div className="bg-white border border-gray-300 rounded-md p-1 flex">
              <button onClick={() => setViewMode('grid')} className={`p-1 rounded ${viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`} title="Grid view">
                <GridIcon className="h-5 w-5" />
              </button>
              <button onClick={() => setViewMode('columns')} className={`p-1 rounded ${viewMode === 'columns' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`} title="Column view">
                <ColumnsIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
        {showFilters && <div className="mb-6">
            <PatternSelector selectedPatterns={selectedPatterns} onPatternSelect={pattern => setSelectedPatterns([...selectedPatterns, pattern])} onPatternRemove={patternId => setSelectedPatterns(selectedPatterns.filter(p => p.id !== patternId))} />
          </div>}
        {filteredPhotos.length === 0 ? <div className="py-12 text-center">
            <p className="text-gray-500">
              No photos match your selected patterns.
            </p>
          </div> : viewMode === 'grid' ? <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredPhotos.map(photo => <PhotoCard key={photo.id} id={photo.id} imageUrl={photo.imageUrl} title={photo.title} patterns={photo.patterns} onClick={() => setSelectedPhoto(photo)} />)}
          </div> : <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
            {filteredPhotos.map(photo => <div key={photo.id} className="break-inside-avoid">
                <PhotoCard id={photo.id} imageUrl={photo.imageUrl} title={photo.title} patterns={photo.patterns} onClick={() => setSelectedPhoto(photo)} />
              </div>)}
          </div>}
      </main>
      <PhotoViewer isOpen={!!selectedPhoto} onClose={() => setSelectedPhoto(null)} photo={selectedPhoto} />
    </div>;
};
export default Gallery;