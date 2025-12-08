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
  films: Film[];
}

interface Film {
  id: string;
  title: string;
}

export default function PersonDetails({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [person, setPerson] = useState<Person | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
        const response = await fetch(`${apiUrl}/details/people/${id}`);
        const data = await response.json();
        setPerson(data);
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
            {person.films?.map((film) => (
              <Link
                key={film.id}
                href={`/films/${film.id}`}
                className={styles.link}
              >
                {film.title}
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
