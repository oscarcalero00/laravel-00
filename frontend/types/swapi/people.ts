export interface PersonProperties {
  created: string;
  edited: string;
  name: string;
  gender?: string;
  skin_color?: string;
  hair_color?: string;
  height?: string;
  eye_color?: string;
  mass?: string;
  homeworld?: string;
  birth_year?: string;
  vehicles?: string[];
  starships?: string[];
  films?: string[];
  url?: string;
  [key: string]: unknown;
}

export interface SwapiPersonResult {
  properties: PersonProperties;
  _id: string;
  description?: string;
  uid: string;
}

export interface SwapiPeopleResponse {
  message: string;
  result: SwapiPersonResult[];
  apiVersion?: string;
  timestamp?: string;
}
