"use client";

import React, { useState } from "react";
import SearchForm from "../../app/components/SearchForm";
import ResultsList from "../../app/components/ResultsList";
import { mockPeople, mockMovies } from "../../types/mocks";
import * as styles from "../../styles/search.css";

export default function SearchDemoPage() {
  const [currentType, setCurrentType] = useState<string>("people");
  const results = currentType === "people" ? mockPeople : mockMovies;

  return (
    <div style={{ padding: '40px', minHeight: '100vh', background: '#ededed' }}>
      <div style={{ display: 'flex', gap: '30px', maxWidth: '1200px' }}>
        <SearchForm />

        <div className={styles.resultsContainer}>
          <h2 className={styles.resultsTitle}>Results</h2>
          <ResultsList items={results} type={currentType} />
        </div>
      </div>
    </div>
  );
}
