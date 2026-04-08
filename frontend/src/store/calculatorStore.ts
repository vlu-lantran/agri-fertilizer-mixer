import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export interface Ingredient {
  id: string; // internal to frontend
  fertilizer_id: string;
  name: string;
  n_percent: number;
  p_percent: number;
  k_percent: number;
  current_price_vnd: number;
  quantity: number;
}

interface CalculatorState {
  ingredients: Ingredient[];
  addIngredient: (ingredient: Omit<Ingredient, 'id' | 'quantity'>) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeIngredient: (id: string) => void;
}

export const useCalculatorStore = create<CalculatorState>()(
  persist(
    (set) => ({
      ingredients: [],
      addIngredient: (ing) => set((state) => ({
        ingredients: [...state.ingredients, { ...ing, id: uuidv4(), quantity: 0 }]
      })),
      updateQuantity: (id, quantity) => set((state) => ({
        ingredients: state.ingredients.map(ing => ing.id === id ? { ...ing, quantity } : ing)
      })),
      removeIngredient: (id) => set((state) => ({
        ingredients: state.ingredients.filter(ing => ing.id !== id)
      }))
    }),
    {
      name: 'calculator-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
