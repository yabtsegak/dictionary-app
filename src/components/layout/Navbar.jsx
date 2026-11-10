import { Link, NavLink } from 'react-router-dom';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import styles from './Navbar.module.css';

export default function Navbar() {
  const favorites = useFavoritesStore((s) => s.favorites);
  return (
    <nav className={styles.nav}>
      <Link to="/" className={styles.brand}>
        <span className={styles.logo}>📖</span>
        <span>Lexi</span>
      </Link>
      <div className={styles.links}>
        <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
          Search
        </NavLink>
        <NavLink to="/favorites" className={({ isActive }) => (isActive ? styles.active : styles.link)}>
          Favorites
          {favorites.length > 0 && <span className={styles.badge}>{favorites.length}</span>}
        </NavLink>
      </div>
    </nav>
  );
}
