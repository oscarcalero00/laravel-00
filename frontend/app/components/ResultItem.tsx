import React from 'react';
import Link from 'next/link';
import * as styles from '../../styles/resultItem.css';

interface ResultItemProps {
  name: string | undefined;
  id: string;
  type: string;
}

export default function ResultItem({ name, id, type }: ResultItemProps) {
  // Extract ID from URL if it's a full URL
  const extractId = (idOrUrl: string) => {
    const match = idOrUrl.match(/\/(\d+)\//);
    return match ? match[1] : idOrUrl;
  };

  const cleanId = extractId(id);
  const route = type === 'people' ? `/people/${cleanId}` : `/films/${cleanId}`;

  return (
    <div className={styles.resultItem}>
      <h3 className={styles.itemTitle}>{name || 'Unknown'}</h3>
      <Link 
        href={route} 
        className={styles.detailsButton}
      >
        SEE DETAILS
      </Link>
    </div>
  );
}
