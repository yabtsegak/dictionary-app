import { create } from 'zustand';
import { searchWord } from '@/services/dictionaryApi';

export const useDictionaryStore = create((set) => ({
  results: null,
  loading: false,
  error: null,
  history: [],

  search: async (word) => {
    if (!word.trim()) return;
    set({ loading: true, error: null, results: null });
    try {
      const data = await searchWord(word.trim());
      set((state) => ({
        results: data,
        loading: false,
        history: [word.trim(), ...state.history.filter((w) => w !== word.trim())].slice(0, 8),
      }));
    } catch (err) {
      set({
        loading: false,
        error: err.response?.status === 404
          ? `No results for "${word}". Try another word.`
          : 'Something went wrong. Check your connection.',
      });
    }
  },

  clear: () => set({ results: null, error: null }),
}));
