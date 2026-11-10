import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],
      isFavorite: (word) => get().favorites.includes(word),
      toggleFavorite: (word) =>
        set((state) => ({
          favorites: state.favorites.includes(word)
            ? state.favorites.filter((w) => w !== word)
            : [...state.favorites, word],
        })),
      removeFavorite: (word) =>
        set((state) => ({
          favorites: state.favorites.filter((w) => w !== word),
        })),
    }),
    { name: 'lexi-favorites' }
  )
);
