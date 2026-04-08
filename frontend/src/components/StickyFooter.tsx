import React from 'react';
import { formatVND } from '../utils/formatters';
import { useSettingsStore } from '../store/settingsStore';
import { translations } from '../utils/translations';

interface Props {
  totalMass: number;
  finalN: number;
  finalP: number;
  finalK: number;
  totalCost: number;
}

export const StickyFooter: React.FC<Props> = ({ totalMass, finalN, finalP, finalK, totalCost }) => {
  const lang = useSettingsStore(state => state.language);
  const t = translations[lang];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-5 pb-safe shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] dark:shadow-2xl z-50 transition-colors duration-300">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-end mb-5">
          <div>
            <div className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{t.totalMass}</div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{totalMass.toFixed(2)} <span className="text-sm text-gray-500 dark:text-gray-400 font-normal">kg</span></div>
          </div>
          <div className="text-right">
            <div className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">{t.estCost}</div>
            <div className="text-3xl font-black text-green-600 dark:text-green-500">{formatVND(totalCost)}</div>
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center">
            <span className="w-8 font-black text-green-600 dark:text-green-500 text-lg">N</span>
            <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700 transition-colors">
              <div className="h-full bg-green-500 transition-all duration-300 dark:shadow-[0_0_10px_rgba(34,197,94,0.5)]" style={{ width: `${Math.min(100, finalN)}%` }}></div>
            </div>
            <span className="w-14 text-right text-sm font-bold text-gray-700 dark:text-gray-200">{finalN.toFixed(1)}%</span>
          </div>
          <div className="flex items-center">
            <span className="w-8 font-black text-yellow-500 text-lg">P</span>
            <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700 transition-colors">
              <div className="h-full bg-yellow-500 transition-all duration-300 dark:shadow-[0_0_10px_rgba(234,179,8,0.5)]" style={{ width: `${Math.min(100, finalP)}%` }}></div>
            </div>
            <span className="w-14 text-right text-sm font-bold text-gray-700 dark:text-gray-200">{finalP.toFixed(1)}%</span>
          </div>
          <div className="flex items-center">
            <span className="w-8 font-black text-red-500 text-lg">K</span>
            <div className="flex-1 h-4 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden border border-gray-300 dark:border-gray-700 transition-colors">
              <div className="h-full bg-red-500 transition-all duration-300 dark:shadow-[0_0_10px_rgba(239,68,68,0.5)]" style={{ width: `${Math.min(100, finalK)}%` }}></div>
            </div>
            <span className="w-14 text-right text-sm font-bold text-gray-700 dark:text-gray-200">{finalK.toFixed(1)}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
