import React, { useState } from 'react';
import { useSettingsStore } from '../store/settingsStore';
import { translations } from '../utils/translations';

interface Props {
  onClose: () => void;
  onSave: (data: any) => void;
}

export const SaveFormulaModal: React.FC<Props> = ({ onClose, onSave }) => {
  const lang = useSettingsStore(state => state.language);
  const t = translations[lang];

  const [name, setName] = useState('');
  const [area, setArea] = useState('');
  const [crop, setCrop] = useState('');
  const [soil, setSoil] = useState('');

  return (
    <div className="fixed inset-0 bg-black/60 dark:bg-black/80 z-[100] flex items-center justify-center p-4 backdrop-blur-sm transition-all">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700 shadow-2xl transition-colors duration-300">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">{t.saveFormula}</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">{t.formulaName}</label>
          <input 
            type="text" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl p-3 border border-gray-300 dark:border-transparent outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            placeholder={t.formulaNamePlaceholder}
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">{t.area}</label>
          <input 
            type="number" 
            value={area} 
            onChange={e => setArea(e.target.value)} 
            className="w-full bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white rounded-xl p-3 border border-gray-300 dark:border-transparent outline-none focus:ring-2 focus:ring-green-500 transition-colors"
            placeholder={t.areaPlaceholder}
            min="0"
            step="any"
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">{t.targetCrop}</label>
          <div className="flex flex-wrap gap-2">
            {t.crops.map(c => (
              <button 
                key={c} 
                onClick={() => setCrop(c)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm ${crop === c ? 'bg-green-600 text-white border-transparent' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-transparent'}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-8">
          <label className="block text-gray-700 dark:text-gray-400 text-sm font-bold mb-2">{t.soilType}</label>
          <div className="flex flex-wrap gap-2">
            {t.soils.map(s => (
              <button 
                key={s} 
                onClick={() => setSoil(s)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm ${soil === s ? 'bg-green-600 text-white border-transparent' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-transparent'}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button onClick={onClose} className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-white font-bold py-3 rounded-xl transition-colors">{t.cancel}</button>
          <button 
            onClick={() => onSave({ name, crop, soil, area: parseFloat(area) || undefined })} 
            disabled={!name}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 rounded-xl transition-colors shadow-md"
          >
            {t.save}
          </button>
        </div>
      </div>
    </div>
  );
}
