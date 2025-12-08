"use client";

import React from "react";
import ResultItem from "./ResultItem";
import * as styles from "../../styles/search.css";
import type { Item } from "../../types";

export default function ResultsList({ items, type, isLoading }: { items: Item[]; type: string; isLoading?: boolean }){
  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingText}>Searching...</div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <div className={styles.emptyText}>
          There are zero matches. Use the form to search for People or Movies.
        </div>
      </div>
    );
  }

  return (
    <div>
      {items.map((it, index) => (
        <ResultItem 
          key={it.id ?? index} 
          name={it.name}
          id={it.id ?? ''}
          type={type}
        />
      ))}
    </div>
  );
}
