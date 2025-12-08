"use client";

import React, { createContext, useContext, useState } from "react";
import type { Item } from "../types";
import type { SwapiPeopleResponse, SwapiPersonResult } from "../types/swapi/people";

type TypeState = {
  query: string;
  results: Item[];
  isLoading?: boolean;
};

type SearchContextValue = {
  currentType: string;
  setType: (t: string) => void;
  getTypeState: (t?: string) => TypeState;
  setTypeState: (t: string, state: TypeState) => void;
  search: (type?: string, query?: string) => Promise<void>;
};

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [typeMap, setTypeMap] = useState<Record<string, TypeState>>({});
  const [currentType, setCurrentType] = useState<string>("people");

  function getTypeState(t?: string): TypeState {
    const key = t ?? currentType;
    return typeMap[key] ?? { query: "", results: [], isLoading: false };
  }

  function setTypeState(t: string, state: TypeState) {
    setTypeMap((prev) => ({ ...prev, [t]: state }));
  }

  function setType(t: string) {
    const prev = typeMap[t];
    if (prev) {
      setCurrentType(t);
    } else {
      setTypeMap((prevMap) => ({ ...prevMap, [t]: { query: "", results: [], isLoading: false } }));
      setCurrentType(t);
    }
  }

  async function search(type?: string, query?: string) {
    const t = type ?? currentType;
    const prev = getTypeState(t);
    const q = query ?? prev.query;
    if (!q || q.trim() === "") {
      setTypeState(t, { query: "", results: [], isLoading: false });
      return;
    }

    // Set loading state
    setTypeState(t, { query: q, results: prev.results, isLoading: true });

    const base = (process.env.NEXT_PUBLIC_API_BASE as string) || "http://localhost:8080";
    const url = `${base}/api/search?type=${encodeURIComponent(t)}&query=${encodeURIComponent(q)}`;

    try {
      const res = await fetch(url);
      const data: SwapiPeopleResponse | unknown = await res.json();

      // normalize results (support swapi.tech and swapi.dev shapes)
      let itemsArr: SwapiPersonResult[] = [];
      if (typeof data === "object" && data !== null) {
        const obj = data as Record<string, unknown>;
        if ("result" in obj && Array.isArray(obj["result"])) {
          itemsArr = (obj["result"] as unknown) as SwapiPersonResult[];
        } else if (Array.isArray(obj["results"])) {
          // swapi.dev style
          itemsArr = (obj["results"] as unknown) as SwapiPersonResult[];
        }
      }

      const mapped: Item[] = itemsArr.map((it) => {
        const id = (it.uid ?? it._id ?? "") as string;
        const props = (it as unknown) as Record<string, unknown>;
        
        // Map name/title based on type
        let name: string | undefined;
        if (props["properties"] && typeof props["properties"] === "object") {
          const properties = props["properties"] as Record<string, unknown>;
          
          // For movies, use title; for people, use name
          if (t === "movies") {
            name = properties["title"] as string | undefined;
          } else {
            name = properties["name"] as string | undefined;
          }
        }
        
        // Fallback to top-level fields
        if (!name) {
          if (t === "movies") {
            name = (props["title"] as string | undefined) ?? (props["name"] as string | undefined) ?? String(id);
          } else {
            name = (props["name"] as string | undefined) ?? (props["title"] as string | undefined) ?? String(id);
          }
        }
        
        return { id, name, raw: props } as Item;
      });

      setTypeState(t, { query: q, results: mapped, isLoading: false });
    } catch (error) {
      console.error('Search error', error);
      // on error, keep previous results but update query and stop loading
      setTypeState(t, { query: q, results: getTypeState(t).results, isLoading: false });
    }
  }

  return (
    <SearchContext.Provider value={{ currentType, setType, getTypeState, setTypeState, search }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used inside SearchProvider");
  return ctx;
}
