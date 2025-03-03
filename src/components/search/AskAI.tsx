import { useState, useEffect } from 'react';
import SearchAI, { Recommendation } from '../../services/SearchAI';
import { searchMedia } from '../../services/api';
import { MovieBasic } from '../../types/api.types';
import MovieGrid from './MovieGrid';
import LoadingMessage from '../ui/LoadingMessage';

/**
 * MovieSearch component for AI-powered movie recommendations
 */
const MovieSearch = () => {
  const [description, setDescription] = useState('');
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [movieResults, setMovieResults] = useState<MovieBasic[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearchingMovies, setIsSearchingMovies] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchStatus, setSearchStatus] = useState<{ 
    total: number; 
    found: number; 
    skipped: number 
  }>({ total: 0, found: 0, skipped: 0 });

  // Function to search for movies based on recommendations
  const searchForMovies = async (titles: Recommendation[]) => {
    if (!titles.length) return;
    
    setIsSearchingMovies(true);
    setMovieResults([]);
    setSearchStatus({ total: titles.length, found: 0, skipped: 0 });
    
    const foundMovies: MovieBasic[] = [];
    let foundCount = 0;
    let skippedCount = 0;
    
    // Search for each title individually
    for (const rec of titles) {
      try {
        const response = await searchMedia(rec.title, 1);
        
        if (response.Response === "True" && response.Search && response.Search.length > 0) {
          // Take the first search result for each title
          foundMovies.push(response.Search[0]);
          foundCount++;
        } else {
          console.log(`No results found for: ${rec.title}`);
          skippedCount++;
        }
      } catch (err) {
        console.error(`Error searching for "${rec.title}":`, err);
        skippedCount++;
      }
      
      // Update status after each search
      setSearchStatus({ 
        total: titles.length, 
        found: foundCount, 
        skipped: skippedCount 
      });
    }
    
    setMovieResults(foundMovies);
    setIsSearchingMovies(false);
  };

  // Search for movies when recommendations change
  useEffect(() => {
    if (recommendations.length > 0) {
      searchForMovies(recommendations);
    }
  }, [recommendations]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      setError('Please enter a description');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      setMovieResults([]);
      
      const results = await SearchAI(description);
      
      if (results.length === 0) {
        setError('No recommendations found. Please try a different description.');
      } else {
        setRecommendations(results);
      }
    } catch (err) {
      setError('Failed to get recommendations. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="search-results">
      <div className="ai-search-container">
        <h2>Find Media with AI</h2>
        <p className="ai-search-description">
          Describe the type of movie, TV show, or game you're looking for, and our AI will find titles you might enjoy.
        </p>
        
        <form onSubmit={handleSubmit} className="ai-search-form">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe what you're looking for..."
            className="ai-search-textarea"
            rows={4}
          />
          
          <button 
            type="submit" 
            className="search-button ai-search-button"
            disabled={isLoading || !description.trim()}
          >
            {isLoading ? 'Getting Recommendations...' : 'Get Recommendations'}
          </button>
        </form>
        
        {error && (
          <div className="ai-search-error">
            {error}
          </div>
        )}
        
        {isLoading && (
          <LoadingMessage message="Generating recommendations..." />
        )}
        
        {isSearchingMovies && (
          <div className="searching-status">
            Searching for recommended titles... Found {searchStatus.found} of {searchStatus.total} so far
          </div>
        )}
        
        {!isLoading && !isSearchingMovies && movieResults.length > 0 && (
          <div className="search-results-container">
            <h3 className="results-title">AI Recommended Titles</h3>
            <MovieGrid movies={movieResults} />
            
            {searchStatus.skipped > 0 && (
              <div className="recommendation-note">
                Note: {searchStatus.skipped} recommendation{searchStatus.skipped !== 1 ? 's were' : ' was'} 
                not found in our database and {searchStatus.skipped !== 1 ? 'have' : 'has'} been skipped.
              </div>
            )}
          </div>
        )}
        
        {!isLoading && !isSearchingMovies && recommendations.length > 0 && movieResults.length === 0 && (
          <div className="ai-search-error">
            None of the recommended titles could be found in our database. Try a different description.
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieSearch; 