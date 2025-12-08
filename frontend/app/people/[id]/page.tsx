'use client';

import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import * as styles from '../../../styles/details.css';

interface Person {
  name: string;
  birth_year: string;
  gender: string;
  eye_color: string;
  hair_color: string;
  height: string;
  mass: string;
  films: string[];
}

interface Film {
  title: string;
  url: string;
}

export default function PersonDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [person, setPerson] = useState<Person | null>(null);
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
        const response = await fetch(`${apiUrl}/details/people/${id}`);
        const data = await response.json();
        setPerson(data);

        // Fetch film titles
        const filmPromises = data.films.map((url: string) =>
          fetch(url).then((res) => res.json()).then(film => ({ film, url }))
        );
        const filmData = await Promise.all(filmPromises);
        setFilms(filmData.map(({ film, url }) => {
          // Handle both swapi.dev and swapi.tech response structures
          const filmProps = film.result?.properties || film;
          return { 
            title: filmProps.title, 
            url: url || filmProps.url 
          };
        }));
      } catch (error) {
        console.error('Error fetching person:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!person) return <div>Person not found</div>;

  const getFilmId = (url: string) => {
    if (!url) return '';
    const match = url.match(/\/films\/(\d+)\//); 
    return match ? match[1] : '';
  };

  return (
    <div className={styles.detailsContainer}>
      <h1 className={styles.detailsTitle}>{person.name}</h1>
      
      <div className={styles.detailsGrid}>
        <div className={styles.detailsSection}>
          <h2 className={styles.sectionTitle}>Details</h2>
          <div className={styles.sectionContent}>
            {`Birth Year: ${person.birth_year}
Gender: ${person.gender}
Eye Color: ${person.eye_color}
Hair Color: ${person.hair_color}
Height: ${person.height}
Mass: ${person.mass}`}
          </div>
        </div>

        <div className={styles.detailsSection}>
          <h2 className={styles.sectionTitle}>Movies</h2>
          <div className={styles.linkList}>
            {films.filter(film => film?.url && film?.title).map((film, index) => {
              const filmId = getFilmId(film.url);
              return filmId ? (
                <Link
                  key={film.url || index}
                  href={`/films/${filmId}`}
                  className={styles.link}
                >
                  {film.title}
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
