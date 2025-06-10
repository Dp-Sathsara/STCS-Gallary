import React, { useEffect, useState } from 'react';
import { XIcon, UploadIcon, ImageIcon } from 'lucide-react';
import { Pattern } from './PatternSelector';
import PatternSelector from './PatternSelector';
type UploadModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (title: string, file: File | null, patterns: Pattern[]) => void;
};
const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onUpload
}) => {
  const [title, setTitle] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpload(title, file, patterns);
    // Reset form
    setTitle('');
    setFile(null);
    setPreview(null);
    setPatterns([]);
    onClose();
  };
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Upload New Photo</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <XIcon size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-indigo-500" required />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Photo
            </label>
            <div className={`border-2 border-dashed rounded-lg p-4 text-center ${preview ? 'border-indigo-300' : 'border-gray-300 hover:border-indigo-300'}`}>
              {preview ? <div className="relative">
                  <img src={preview} alt="Preview" className="max-h-64 mx-auto rounded" />
                  <button type="button" onClick={() => {
                setFile(null);
                setPreview(null);
              }} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
                    <XIcon size={16} className="text-gray-500" />
                  </button>
                </div> : <label className="cursor-pointer block">
                  <div className="flex flex-col items-center justify-center py-6">
                    <ImageIcon className="h-12 w-12 text-gray-400" />
                    <p className="mt-1 text-sm text-gray-500">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-gray-400">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                  <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                </label>}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Magic Patterns
            </label>
            <PatternSelector selectedPatterns={patterns} onPatternSelect={pattern => setPatterns([...patterns, pattern])} onPatternRemove={patternId => setPatterns(patterns.filter(p => p.id !== patternId))} />
          </div>
          <div className="flex justify-end">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-gray-700 hover:text-gray-900 mr-2">
              Cancel
            </button>
            <button type="submit" disabled={!title || !file} className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 flex items-center">
              <UploadIcon size={16} className="mr-1" />
              Upload Photo
            </button>
          </div>
        </form>
      </div>
    </div>;
};
export default UploadModal;