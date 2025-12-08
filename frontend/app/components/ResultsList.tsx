"use client";

import React from "react";
import ResultItem from "./ResultItem";
import * as styles from "../../styles/search.css";
import type { Item } from "../../types";

export default function ResultsList({ items, type }: { items: Item[]; type: string }){
  return (
    <div>
      {items.length === 0 ? (
        <div className={styles.smallMuted}>No results</div>
      ) : (
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
      )}
    </div>
  );
}
