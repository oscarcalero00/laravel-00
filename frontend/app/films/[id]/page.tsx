'use client';

import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import * as styles from '../../../styles/details.css';

interface Film {
  title: string;
  opening_crawl: string;
  characters: Character[];
}

interface Character {
  id: string;
  name: string;
}

export default function FilmDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
        const response = await fetch(`${apiUrl}/details/movies/${id}`);
        const data = await response.json();
        setFilm(data);
      } catch (error) {
        console.error('Error fetching film:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilm();
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingText}>Loading...</div>
      </div>
    );
  }
  if (!film) return <div>Film not found</div>;

  return (
    <div className={styles.detailsContainer}>
      <h1 className={styles.detailsTitle}>{film.title}</h1>
      
      <div className={styles.detailsGrid}>
        <div className={styles.detailsSection}>
          <h2 className={styles.sectionTitle}>Opening Crawl</h2>
          <div className={styles.sectionContent}>
            {film.opening_crawl}
          </div>
        </div>

        <div className={styles.detailsSection}>
          <h2 className={styles.sectionTitle}>Characters</h2>
          <div className={styles.linkList}>
            {film.characters?.map((character) => (
              <Link
                key={character.id}
                href={`/people/${character.id}`}
                className={styles.link}
              >
                {character.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Link href="/search" className={styles.backButton}>
        BACK TO SEARCH
      </Link>
    </div>
  );
}
