import { Link } from 'react-router-dom';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import styles from './Favorites.module.css';

export default function Favorites() {
  const { favorites, removeFavorite } = useFavoritesStore();

  return (
    <div className={styles.favorites}>
      <header className={styles.header}>
        <h1>Your Favorites</h1>
        <p>{favorites.length} word{favorites.length !== 1 ? 's' : ''} saved</p>
      </header>

      {favorites.length === 0 ? (
        <div className={styles.empty}>
          <span className={styles.emptyIcon}>☆</span>
          <h2>No favorites yet</h2>
          <p>Tap the star on any word to save it here.</p>
          <Link to="/" className={styles.cta}>Search a word →</Link>
        </div>
      ) : (
        <ul className={styles.list}>
          {favorites.map((word) => (
            <li key={word} className={styles.item}>
              <Link to={`/word/${word}`} className={styles.wordLink}>
                <span className={styles.star}>★</span>
                {word}
              </Link>
              <button className={styles.remove} onClick={() => removeFavorite(word)} title="Remove">✕</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
