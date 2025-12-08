export interface FilmProperties {
  created: string;
  edited: string;
  title: string;
  episode_id?: number;
  director?: string;
  producer?: string;
  release_date?: string;
  opening_crawl?: string;
  characters?: string[];
  planets?: string[];
  starships?: string[];
  vehicles?: string[];
  species?: string[];
  url?: string;
  [key: string]: unknown;
}

export interface SwapiFilmResult {
  properties: FilmProperties;
  _id: string;
  description?: string;
  uid: string;
}

export interface SwapiFilmsResponse {
  message: string;
  result: SwapiFilmResult[];
  apiVersion?: string;
  timestamp?: string;
}
