import React from 'react';
import { formatVND } from '../utils/formatters';
import { useSettingsStore } from '../store/settingsStore';
import { translations } from '../utils/translations';

interface Props {
  name: string;
  n: number;
  p: number;
  k: number;
  price: number;
  onAdd: () => void;
}

export const FertilizerCard: React.FC<Props> = ({ name, n, p, k, price, onAdd }) => {
  const lang = useSettingsStore(state => state.language);
  const t = translations[lang];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 flex justify-between items-center transition-colors duration-300">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">N-P-K: {n}-{p}-{k}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400">{formatVND(price)} / kg</p>
      </div>
      <button 
        onClick={onAdd} 
        className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-xl font-bold transition-colors active:scale-95 shadow-sm"
      >
        {t.add}
      </button>
    </div>
  );
}
