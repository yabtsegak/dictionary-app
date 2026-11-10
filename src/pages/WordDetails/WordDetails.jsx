import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { searchWord } from '@/services/dictionaryApi';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import Loader from '@/components/common/Loader';
import ErrorMessage from '@/components/common/ErrorMessage';
import styles from './WordDetails.module.css';

export default function WordDetails() {
  const { word } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isFavorite, toggleFavorite } = useFavoritesStore();
  const favorited = isFavorite(word);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    searchWord(word)
      .then((d) => !cancelled && setData(d))
      .catch(() => !cancelled && setError(`Could not load "${word}".`))
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [word]);

  const playAudio = () => {
    const audio = data?.phonetics?.find((p) => p.audio)?.audio;
    if (audio) new Audio(audio).play();
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return null;

  return (
    <div className={styles.details}>
      <button className={styles.back} onClick={() => navigate(-1)}>← Back</button>

      <div className={styles.header}>
        <div>
          <h1>{data.word}</h1>
          {data.phonetic && <p className={styles.phonetic}>{data.phonetic}</p>}
        </div>
        <div className={styles.actions}>
          {data.phonetics?.some((p) => p.audio) && (
            <button className={styles.iconBtn} onClick={playAudio} title="Play pronunciation">🔊</button>
          )}
          <button
            className={`${styles.iconBtn} ${favorited ? styles.favActive : ''}`}
            onClick={() => toggleFavorite(data.word)}
            title={favorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            {favorited ? '★' : '☆'}
          </button>
        </div>
      </div>

      {data.meanings.map((meaning, i) => (
        <section key={i} className={styles.meaning}>
          <div className={styles.posRow}>
            <span className={styles.pos}>{meaning.partOfSpeech}</span>
          </div>
          <ol className={styles.defList}>
            {meaning.definitions.map((def, j) => (
              <li key={j}>
                <p className={styles.definition}>{def.definition}</p>
                {def.example && <p className={styles.example}>“{def.example}”</p>}
              </li>
            ))}
          </ol>
          {meaning.synonyms?.length > 0 && (
            <div className={styles.relRow}>
              <span className={styles.relLabel}>Synonyms:</span>
              {meaning.synonyms.slice(0, 6).map((s) => (
                <button key={s} className={styles.relChip} onClick={() => navigate(`/word/${s}`)}>{s}</button>
              ))}
            </div>
          )}
          {meaning.antonyms?.length > 0 && (
            <div className={styles.relRow}>
              <span className={styles.relLabel}>Antonyms:</span>
              {meaning.antonyms.slice(0, 6).map((s) => (
                <button key={s} className={styles.relChip} onClick={() => navigate(`/word/${s}`)}>{s}</button>
              ))}
            </div>
          )}
        </section>
      ))}

      {data.sourceUrls?.[0] && (
        <p className={styles.source}>
          Source: <a href={data.sourceUrls[0]} target="_blank" rel="noreferrer">{data.sourceUrls[0]}</a>
        </p>
      )}
    </div>
  );
}
