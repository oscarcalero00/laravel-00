"use client";

import React from "react";
import SearchForm from "../../app/components/SearchForm";
import ResultsList from "../../app/components/ResultsList";
import { useSearch } from "../../context/SearchContext";
import * as styles from "../../styles/search.css";

export default function SearchPage() {
  const { currentType, getTypeState } = useSearch();
  const state = getTypeState(currentType);
  const isLoading = state.isLoading ?? false;
  
  return (
    <div className={styles.searchPage}>
      <div className={styles.searchLayout}>
        <SearchForm />

        <div className={styles.resultsContainer}>
          <h2 className={styles.resultsTitle}>Results</h2>
          <ResultsList items={state.results} type={currentType} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}
