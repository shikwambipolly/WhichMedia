/**
 * API Types
 * Type definitions for API requests, responses, and data models
 */

// Base movie type with essential information
export interface MovieBasic {
  imdbID: string;
  Title: string;
  Year: string;
  Type: string;
  Poster: string;
}

// Extended movie type with detailed information from OMDB API
export interface MovieDetailed extends MovieBasic {
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response: string;
}

// API response types
export interface SearchResponse {
  Search: MovieBasic[];
  totalResults: string;
  Response: string;
}

export interface ErrorResponse {
  Response: "False";
  Error: string;
}

// Generic API response type
export type ApiResponse<T> = T | ErrorResponse;

// API request parameter types
export interface SearchParams {
  s: string;          // Search term
  type?: string;      // Type of result to return (movie, series, episode)
  y?: string;         // Year of release
  page: number;       // Page number to return
  apiKey: string;     // API key (added automatically by the API client)
}

export interface DetailParams {
  i: string;          // IMDB ID
  plot?: "short" | "full"; // Plot length (short or full)
  apiKey: string;     // API key (added automatically by the API client)
}

// AI recommendation types
export interface RecommendationParams {
  query: string;       // Natural language query
  count?: number;      // Number of recommendations to return
}

export interface RecommendationResponse {
  recommendations: string[];
  error?: string;
} 