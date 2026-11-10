import { Link } from 'react-router-dom';
import styles from './WordCard.module.css';

export default function WordCard({ word, phonetic, partOfSpeech, definition }) {
  return (
    <Link to={`/word/${word}`} className={styles.card}>
      <div className={styles.head}>
        <h3>{word}</h3>
        {phonetic && <span className={styles.phonetic}>{phonetic}</span>}
      </div>
      {partOfSpeech && <span className={styles.pos}>{partOfSpeech}</span>}
      <p className={styles.def}>{definition}</p>
    </Link>
  );
}
