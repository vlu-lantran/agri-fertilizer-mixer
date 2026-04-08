import React, { useState } from 'react';
import { useCalculatorStore } from '../store/calculatorStore';
import { useSettingsStore } from '../store/settingsStore';
import { translations } from '../utils/translations';
import { FertilizerCard } from '../components/FertilizerCard';
import { SliderInput } from '../components/SliderInput';
import { StickyFooter } from '../components/StickyFooter';
import { SaveFormulaModal } from '../components/SaveFormulaModal';
import { Sun, Moon, Globe } from 'lucide-react';

const MOCK_INVENTORY = [
  { id: '1', name: 'Urê (Urea) Phú Mỹ', type: 'Single', n: 46, p: 0, k: 0, price: 12600 },
  { id: '2', name: 'DAP Hồng Hà (Trung Quốc)', type: 'Compound', n: 18, p: 46, k: 0, price: 25600 },
  { id: '3', name: 'Kali (MOP) Cà Mau', type: 'Single', n: 0, p: 0, k: 60, price: 10400 },
  { id: '4', name: 'Super Lân Lâm Thao', type: 'Single', n: 0, p: 16, k: 0, price: 5000 },
  { id: '5', name: 'NPK 20-20-15 Đầu Trâu', type: 'Blend', n: 20, p: 20, k: 15, price: 19600 },
  { id: '6', name: 'NPK 16-16-8 Việt Nhật', type: 'Blend', n: 16, p: 16, k: 8, price: 16000 },
];

export const CalculatorView: React.FC = () => {
  const { ingredients, addIngredient, updateQuantity, removeIngredient } = useCalculatorStore();
  const [showInventory, setShowInventory] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  
  const { theme, language, toggleTheme, toggleLanguage } = useSettingsStore();
  const t = translations[language];

  // Client-side approximation for real-time slider feedback
  const totalMass = ingredients.reduce((sum, ing) => sum + ing.quantity, 0);
  const totalCost = ingredients.reduce((sum, ing) => sum + (ing.quantity * ing.current_price_vnd), 0);
  
  let finalN = 0, finalP = 0, finalK = 0;
  if (totalMass > 0) {
    const totalNMass = ingredients.reduce((sum, ing) => sum + ing.quantity * (ing.n_percent / 100), 0);
    const totalPMass = ingredients.reduce((sum, ing) => sum + ing.quantity * (ing.p_percent / 100), 0);
    const totalKMass = ingredients.reduce((sum, ing) => sum + ing.quantity * (ing.k_percent / 100), 0);
    
    finalN = (totalNMass / totalMass) * 100;
    finalP = (totalPMass / totalMass) * 100;
    finalK = (totalKMass / totalMass) * 100;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#121212] text-gray-900 dark:text-white pb-64 transition-colors duration-300">
      <div className="max-w-md mx-auto p-4 pt-6">
        
        {/* Header with Toggles */}
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={toggleLanguage} 
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 text-sm font-bold shadow-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <Globe size={18} />
            {language === 'vi' ? 'Tiếng Việt' : 'English'}
          </button>
          
          <button 
            onClick={toggleTheme} 
            className="p-2.5 rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-yellow-400 shadow-md border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>

        <h1 className="text-3xl font-black mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-400 dark:to-emerald-600">
          {t.title}
        </h1>

        <div className="mb-8 space-y-4">
          {ingredients.map(ing => (
            <SliderInput 
              key={ing.id}
              name={ing.name}
              value={ing.quantity}
              onChange={(val) => updateQuantity(ing.id, val)}
              onRemove={() => removeIngredient(ing.id)}
            />
          ))}
          
          {ingredients.length === 0 && (
            <div className="text-center p-10 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl text-gray-500 dark:text-gray-500 bg-white/50 dark:bg-transparent">
              <p className="font-semibold mb-2">{t.noIngredients}</p>
              <p className="text-sm">{t.tapToAdd}</p>
            </div>
          )}
        </div>

        <button 
          onClick={() => setShowInventory(true)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98]"
        >
          {t.addFertilizer}
        </button>

        {ingredients.length > 0 && (
          <button 
            onClick={() => setShowSaveModal(true)}
            className="w-full mt-4 bg-gray-800 dark:bg-gray-700 hover:bg-gray-900 dark:hover:bg-gray-600 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98]"
          >
            {t.saveFormula}
          </button>
        )}
      </div>

      {/* Inventory Drawer */}
      <div 
        className={`fixed inset-y-0 right-0 w-full max-w-md bg-gray-50 dark:bg-gray-900 shadow-[[-10px_0_15px_rgba(0,0,0,0.1)]] dark:shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out flex flex-col ${showInventory ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-white dark:bg-gray-800 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t.inventory}</h2>
          <button 
            onClick={() => setShowInventory(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 font-bold px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            {t.closeInventory}
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4 pb-32">
          {MOCK_INVENTORY.map(item => (
            <FertilizerCard
              key={item.id}
              name={item.name}
              n={item.n}
              p={item.p}
              k={item.k}
              price={item.price}
              onAdd={() => {
                // Prevent duplicate adds of the same fertilizer ID
                if (!ingredients.find(i => i.fertilizer_id === item.id)) {
                  addIngredient({
                    fertilizer_id: item.id,
                    name: item.name,
                    n_percent: item.n,
                    p_percent: item.p,
                    k_percent: item.k,
                    current_price_vnd: item.price
                  });
                }
                setShowInventory(false);
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Overlay for drawer */}
      {showInventory && (
        <div 
          className="fixed inset-0 bg-black/60 z-[50] transition-opacity backdrop-blur-sm"
          onClick={() => setShowInventory(false)}
        />
      )}

      {showSaveModal && (
        <SaveFormulaModal 
          onClose={() => setShowSaveModal(false)}
          onSave={(data) => {
            console.log('Formula Saved:', data);
            setShowSaveModal(false);
          }}
        />
      )}

      <StickyFooter 
        totalMass={totalMass}
        finalN={finalN}
        finalP={finalP}
        finalK={finalK}
        totalCost={totalCost}
      />
    </div>
  );
}
