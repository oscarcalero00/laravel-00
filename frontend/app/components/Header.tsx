import React from 'react';
import * as styles from '../../styles/header.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.title}>SWStarter</h1>
      </div>
    </header>
  );
}
