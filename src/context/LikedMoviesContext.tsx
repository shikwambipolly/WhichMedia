import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { MovieBasic } from '../types/api.types';

// Define the context shape
interface LikedMoviesContextType {
  likedMovies: MovieBasic[];
  toggleLikedMovie: (movie: MovieBasic) => void;
  isMovieLiked: (imdbID: string) => boolean;
  clearLikedMovies?: () => void;
}

// Create the context with default values
const LikedMoviesContext = createContext<LikedMoviesContextType>({
  likedMovies: [],
  toggleLikedMovie: () => {},
  isMovieLiked: () => false,
});

// Provider props interface
interface LikedMoviesProviderProps {
  children: ReactNode;
}

// Storage key for session storage
const STORAGE_KEY = 'likedMovies';

// Provider component
export function LikedMoviesProvider({ children }: LikedMoviesProviderProps) {
  const [likedMovies, setLikedMovies] = useState<MovieBasic[]>([]);

  // Load liked movies from sessionStorage on initial render
  useEffect(() => {
    try {
      const storedLikedMovies = sessionStorage.getItem(STORAGE_KEY);
      if (storedLikedMovies) {
        const parsedMovies = JSON.parse(storedLikedMovies);
        // Validate the parsed data is an array
        if (Array.isArray(parsedMovies)) {
          console.log('Loaded liked movies from session storage:', parsedMovies);
          setLikedMovies(parsedMovies);
        } else {
          console.error('Stored liked movies is not an array, resetting storage');
          sessionStorage.removeItem(STORAGE_KEY);
        }
      }
    } catch (error) {
      console.error('Failed to parse liked movies from sessionStorage:', error);
      // If parsing fails, reset sessionStorage
      sessionStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Save liked movies to sessionStorage whenever they change
  useEffect(() => {
    try {
      console.log('Saving liked movies to session storage:', likedMovies);
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(likedMovies));
    } catch (error) {
      console.error('Error saving liked movies to session storage:', error);
    }
  }, [likedMovies]);

  /**
   * Check if a specific movie is liked
   */
  const isMovieLiked = useCallback((imdbID: string): boolean => {
    return likedMovies.some(movie => movie.imdbID === imdbID);
  }, [likedMovies]);

  /**
   * Toggle a movie as liked or unliked
   */
  const toggleLikedMovie = useCallback((movie: MovieBasic) => {
    console.log('Toggling like for movie:', movie);
    
    setLikedMovies(prevLikedMovies => {
      // Check if the movie is already liked
      const isAlreadyLiked = prevLikedMovies.some(m => m.imdbID === movie.imdbID);
      console.log(`Movie ${movie.Title} is already liked: ${isAlreadyLiked}`);
      
      if (isAlreadyLiked) {
        // Remove the movie from liked movies
        console.log(`Removing movie ${movie.Title} from liked movies`);
        return prevLikedMovies.filter(m => m.imdbID !== movie.imdbID);
      } else {
        // Add the movie to liked movies
        console.log(`Adding movie ${movie.Title} to liked movies`);
        return [...prevLikedMovies, movie];
      }
    });
  }, []);

  /**
   * Clear all liked movies
   */
  const clearLikedMovies = useCallback((): void => {
    setLikedMovies([]);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  // Context value to be provided
  const value = {
    likedMovies,
    toggleLikedMovie,
    isMovieLiked,
    clearLikedMovies
  };

  return (
    <LikedMoviesContext.Provider value={value}>
      {children}
    </LikedMoviesContext.Provider>
  );
}

// Custom hook for using the context
export function useLikedMoviesContext() {
  const context = useContext(LikedMoviesContext);
  if (context === undefined) {
    throw new Error('useLikedMoviesContext must be used within a LikedMoviesProvider');
  }
  return context;
} 