import React from 'react';
import * as styles from '../../styles/resultItem.css';

interface ResultItemProps {
  name: string | undefined;
  id: string;
  type: string;
}

export default function ResultItem({ name, id, type }: ResultItemProps) {
  return (
    <div className={styles.resultItem}>
      <h3 className={styles.itemTitle}>{name || 'Unknown'}</h3>
      <a 
        href={`/details/${type}/${id}`} 
        className={styles.detailsButton}
      >
        SEE DETAILS
      </a>
    </div>
  );
}
