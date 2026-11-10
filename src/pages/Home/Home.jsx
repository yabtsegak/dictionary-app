import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDictionaryStore } from '@/store/useDictionaryStore';
import Loader from '@/components/common/Loader';
import ErrorMessage from '@/components/common/ErrorMessage';
import WordCard from '@/components/common/WordCard';
import styles from './Home.module.css';

const SUGGESTIONS = ['serendipity', 'ephemeral', 'eloquent', 'resilience', 'wanderlust'];

export default function Home() {
  const [query, setQuery] = useState('');
  const { results, loading, error, search, history } = useDictionaryStore();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) search(query);
  };

  return (
    <div className={styles.home}>
      <header className={styles.hero}>
        <h1>Discover the meaning of <em>any</em> word.</h1>
        <p>Search millions of words, definitions, pronunciations, and examples.</p>
      </header>

      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          type="text"
          placeholder="Type a word… e.g. serendipity"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />
        <button type="submit">Search</button>
      </form>

      {history.length > 0 && (
        <div className={styles.recent}>
          <span className={styles.recentLabel}>Recent:</span>
          {history.map((w) => (
            <button key={w} className={styles.chip} onClick={() => { setQuery(w); search(w); }}>
              {w}
            </button>
          ))}
        </div>
      )}

      {!results && !loading && !error && (
        <div className={styles.suggestions}>
          <p className={styles.suggestLabel}>Try one of these:</p>
          <div className={styles.chips}>
            {SUGGESTIONS.map((w) => (
              <button key={w} className={styles.chip} onClick={() => { setQuery(w); search(w); }}>
                {w}
              </button>
            ))}
          </div>
        </div>
      )}

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}

      {results && (
        <div className={styles.results}>
          {results.meanings?.map((meaning, i) => (
            <WordCard
              key={i}
              word={results.word}
              phonetic={results.phonetic || results.phonetics?.[0]?.text}
              partOfSpeech={meaning.partOfSpeech}
              definition={meaning.definitions[0].definition}
            />
          ))}
          <button className={styles.detailsBtn} onClick={() => navigate(`/word/${results.word}`)}>
            View full definition →
          </button>
        </div>
      )}
    </div>
  );
}
