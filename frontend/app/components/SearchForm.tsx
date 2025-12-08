"use client";

import React, { useState, useEffect } from "react";
import { useSearch } from "../../context/SearchContext";
import * as styles from "../../styles/searchForm.css";

export default function SearchForm() {
  const { currentType, setType, getTypeState, search } = useSearch();
  const state = getTypeState(currentType);
  const [query, setQuery] = useState(state.query ?? "");

  useEffect(() => {
    // when currentType changes, update local query to stored query
    const s = getTypeState(currentType);
    setQuery(s.query ?? "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentType]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    await search(currentType, query);
  }

  function onChangeType(t: string) {
    setType(t);
  }

  return (
    <form className={styles.SearchContainer} onSubmit={onSubmit}>
      <h3 className={styles.WhatAreYouSearchingFor}>What are you searching for?</h3>
      <div className={styles.radioGroup}>
        <label className={styles.radioLabel}>
          <input 
            type="radio" 
            name="type" 
            className={styles.customRadio}
            checked={currentType === "people"} 
            onChange={() => onChangeType("people")} 
          /> 
          People
        </label>
        <label className={styles.radioLabel}>
          <input 
            type="radio" 
            name="type" 
            className={styles.customRadio}
            checked={currentType === "movies"} 
            onChange={() => onChangeType("movies")} 
          /> 
          Movies
        </label>
      </div>

      <input className={styles.input} value={query} onChange={(e) => setQuery(e.target.value)} placeholder="search..." />

      <button className={styles.btn} type="submit">SEARCH</button>
    </form>
  );
}
