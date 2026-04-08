import React from 'react';
import { useSettingsStore } from '../store/settingsStore';
import { translations } from '../utils/translations';

interface Props {
  name: string;
  value: number;
  onChange: (val: number) => void;
  onRemove: () => void;
}

export const SliderInput: React.FC<Props> = ({ name, value, onChange, onRemove }) => {
  const lang = useSettingsStore(state => state.language);
  const t = translations[lang];

  return (
    <div className="bg-white dark:bg-gray-800 p-5 rounded-xl mb-4 shadow-md border border-gray-200 dark:border-gray-700 transition-colors duration-300">
      <div className="flex justify-between items-center mb-4">
        <span className="font-bold text-gray-900 dark:text-white text-lg">{name}</span>
        <button onClick={onRemove} className="text-red-500 hover:text-red-400 dark:text-red-400 dark:hover:text-red-300 text-sm font-semibold p-1">{t.remove}</button>
      </div>
      <div className="flex items-center space-x-4">
        <button 
          onClick={() => onChange(Math.max(0, value - 1))} 
          className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-500 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold text-gray-700 dark:text-white transition-colors shadow-inner"
        >
          -
        </button>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={value} 
          onChange={(e) => onChange(Number(e.target.value))} 
          className="flex-1 h-3 bg-gray-300 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer accent-green-600 dark:accent-green-500 transition-colors duration-300"
        />
        <button 
          onClick={() => onChange(value + 1)} 
          className="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 active:bg-gray-300 dark:active:bg-gray-500 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold text-gray-700 dark:text-white transition-colors shadow-inner"
        >
          +
        </button>
      </div>
      <div className="text-center mt-3 text-green-600 dark:text-green-400 font-bold text-xl">{value} kg</div>
    </div>
  );
}
