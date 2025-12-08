'use client';

import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import * as styles from '../../../styles/details.css';

interface Film {
  title: string;
  opening_crawl: string;
  characters: string[];
}

interface Character {
  name: string;
  url: string;
}

export default function FilmDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [film, setFilm] = useState<Film | null>(null);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
        const response = await fetch(`${apiUrl}/details/movies/${id}`);
        const data = await response.json();
        setFilm(data);

        // Fetch character names
        const characterPromises = data.characters.map((url: string) =>
          fetch(url).then((res) => res.json()).then(char => ({ char, url }))
        );
        const characterData = await Promise.all(characterPromises);
        setCharacters(characterData.map(({ char, url }) => {
          // Handle both swapi.dev and swapi.tech response structures
          const charProps = char.result?.properties || char;
          return { 
            name: charProps.name, 
            url: url || charProps.url 
          };
        }));
      } catch (error) {
        console.error('Error fetching film:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFilm();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!film) return <div>Film not found</div>;

  const getPersonId = (url: string) => {
    if (!url) return '';
    const match = url.match(/\/people\/(\d+)\//); 
    return match ? match[1] : '';
  };

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
            {characters.filter(char => char?.url && char?.name).map((character, index) => {
              const personId = getPersonId(character.url);
              return personId ? (
                <Link
                  key={character.url || index}
                  href={`/people/${personId}`}
                  className={styles.link}
                >
                  {character.name}
                </Link>
              ) : null;
            })}
          </div>
        </div>
      </div>

      <Link href="/search" className={styles.backButton}>
        BACK TO SEARCH
      </Link>
    </div>
  );
}
