import React, { useState } from 'react';
import { PlusIcon, XIcon } from 'lucide-react';
export type Pattern = {
  id: string;
  type: 'color' | 'shape' | 'keyword';
  value: string;
};
type PatternSelectorProps = {
  selectedPatterns: Pattern[];
  onPatternSelect: (pattern: Pattern) => void;
  onPatternRemove: (patternId: string) => void;
};
const PatternSelector: React.FC<PatternSelectorProps> = ({
  selectedPatterns,
  onPatternSelect,
  onPatternRemove
}) => {
  const [showPatternMenu, setShowPatternMenu] = useState(false);
  const [patternType, setPatternType] = useState<'color' | 'shape' | 'keyword'>('color');
  const [keyword, setKeyword] = useState('');
  const colors = ['#F87171', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA', '#F472B6', '#6B7280', '#000000'];
  const shapes = ['circle', 'square', 'triangle', 'star', 'heart', 'diamond'];
  const handlePatternAdd = (type: 'color' | 'shape' | 'keyword', value: string) => {
    const newPattern: Pattern = {
      id: `pattern-${Date.now()}`,
      type,
      value
    };
    onPatternSelect(newPattern);
    if (type === 'keyword') {
      setKeyword('');
    }
    setShowPatternMenu(false);
  };
  return <div className="mb-6">
      <div className="flex flex-wrap items-center gap-2">
        {selectedPatterns.map(pattern => <div key={pattern.id} className={`flex items-center gap-1 px-3 py-1 rounded-full border ${pattern.type === 'color' ? 'bg-white border-gray-200' : pattern.type === 'shape' ? 'bg-indigo-50 border-indigo-100' : 'bg-purple-50 border-purple-100'}`}>
            {pattern.type === 'color' && <div className="w-3 h-3 rounded-full" style={{
          backgroundColor: pattern.value
        }}></div>}
            <span className="text-sm">
              {pattern.type === 'color' ? `Color: ${pattern.value}` : pattern.type === 'shape' ? `Shape: ${pattern.value}` : pattern.value}
            </span>
            <button onClick={() => onPatternRemove(pattern.id)} className="ml-1 text-gray-400 hover:text-gray-600">
              <XIcon size={14} />
            </button>
          </div>)}
        <button onClick={() => setShowPatternMenu(!showPatternMenu)} className="flex items-center gap-1 px-3 py-1 rounded-full border border-dashed border-gray-300 text-gray-500 hover:border-gray-400 hover:text-gray-700">
          <PlusIcon size={14} />
          <span className="text-sm">Add Pattern</span>
        </button>
      </div>
      {showPatternMenu && <div className="mt-3 p-4 bg-white border rounded-lg shadow-sm">
          <div className="flex space-x-4 mb-4">
            <button onClick={() => setPatternType('color')} className={`px-3 py-1 text-sm rounded-full ${patternType === 'color' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}>
              Colors
            </button>
            <button onClick={() => setPatternType('shape')} className={`px-3 py-1 text-sm rounded-full ${patternType === 'shape' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}>
              Shapes
            </button>
            <button onClick={() => setPatternType('keyword')} className={`px-3 py-1 text-sm rounded-full ${patternType === 'keyword' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-700'}`}>
              Keywords
            </button>
          </div>
          {patternType === 'color' && <div className="grid grid-cols-8 gap-2">
              {colors.map(color => <button key={color} onClick={() => handlePatternAdd('color', color)} className="w-8 h-8 rounded-full border border-gray-200 hover:scale-110 transition-transform" style={{
          backgroundColor: color
        }} title={color}></button>)}
            </div>}
          {patternType === 'shape' && <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {shapes.map(shape => <button key={shape} onClick={() => handlePatternAdd('shape', shape)} className="px-3 py-2 bg-indigo-50 border border-indigo-100 rounded hover:bg-indigo-100 text-sm">
                  {shape}
                </button>)}
            </div>}
          {patternType === 'keyword' && <div className="flex">
              <input type="text" value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="Enter keyword..." className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500" />
              <button onClick={() => keyword.trim() && handlePatternAdd('keyword', keyword.trim())} disabled={!keyword.trim()} className="px-4 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 disabled:bg-indigo-300">
                Add
              </button>
            </div>}
        </div>}
    </div>;
};
export default PatternSelector;