import { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../../services/api';
import LoadingMessage from './LoadingMessage';
import ErrorMessage from './ErrorMessage';
// Import SVG icons
import mediaSvg from '../../assets/media.svg';
import videoGameSvg from '../../assets/video-game.svg';

interface MovieDetailsModalProps {
  imdbID: string;
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Modal component for displaying detailed movie information
 */
const MovieDetailsModal = ({ imdbID, isOpen, onClose }: MovieDetailsModalProps) => {
  const [details, setDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch movie details when the modal is opened
  useEffect(() => {
    if (isOpen && imdbID) {
      const getMovieDetails = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
          const data = await fetchMovieDetails(imdbID);
          if (data.Response === "True") {
            setDetails(data);
          } else {
            setError("Failed to load movie details");
          }
        } catch (err) {
          setError("An error occurred while fetching movie details");
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      };
      
      getMovieDetails();
    }
  }, [imdbID, isOpen]);

  // Close the modal when Escape key is pressed
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    
    return () => {
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  /**
   * Determine which placeholder image to use based on media type
   */
  const getPlaceholderImage = () => {
    if (details?.Type === 'game') {
      return videoGameSvg;
    }
    return mediaSvg; // Default for movies and series
  };

  // If the modal is not open, don't render anything
  if (!isOpen) return null;

  // Extract the most important properties (first 12 items + IMDB rating)
  const renderDetails = () => {
    if (!details) return null;

    // Define the most important properties to display (first 12 + Rating)
    const importantProps = [
      { key: "Title", label: "Title" },
      { key: "Year", label: "Year" },
      { key: "Rated", label: "Rated" },
      { key: "Released", label: "Released" },
      { key: "Runtime", label: "Runtime" },
      { key: "Genre", label: "Genre" },
      { key: "Director", label: "Director" },
      { key: "Writer", label: "Writer" },
      { key: "Actors", label: "Actors" },
      { key: "Plot", label: "Plot" },
      { key: "Language", label: "Language" },
      { key: "Country", label: "Country" },
      { key: "imdbRating", label: "IMDB Rating" }
    ];

    return (
      <div className="movie-details-content">
        <div className="movie-details-header">
          <h2>{details.Title}</h2>
          {details.imdbRating && details.imdbRating !== "N/A" && (
            <div className="imdb-rating">
              <span className="rating-star">★</span>
              <span className="rating-value">{details.imdbRating}/10</span>
            </div>
          )}
        </div>
        
        <div className="movie-details-grid">
          <div className="movie-poster-section">
            {details.Poster && details.Poster !== "N/A" ? (
              <img 
                src={details.Poster} 
                alt={`Poster for ${details.Title}`} 
                className="modal-poster-img"
              />
            ) : (
              <div className="modal-no-poster">
                <img 
                  src={getPlaceholderImage()} 
                  alt={`${details.Type} icon for ${details.Title}`}
                  className="placeholder-img"
                />
              </div>
            )}
          </div>
          
          <div className="movie-info-section">
            {importantProps.map(prop => {
              // Skip Title (already shown in header) and Poster (shown separately)
              if (prop.key === "Title" || prop.key === "Poster") return null;
              
              // Skip empty values
              if (!details[prop.key] || details[prop.key] === "N/A") return null;
              
              // Special treatment for Plot (full width)
              if (prop.key === "Plot") {
                return (
                  <div key={prop.key} className="plot-section">
                    <h3>Plot</h3>
                    <p>{details.Plot}</p>
                  </div>
                );
              }
              
              return (
                <div key={prop.key} className="detail-item">
                  <span className="detail-label">{prop.label}:</span>
                  <span className="detail-value">{details[prop.key]}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose} aria-label="Close">
          &times;
        </button>
        
        {isLoading ? (
          <LoadingMessage message="Loading movie details..." />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : (
          renderDetails()
        )}
      </div>
    </div>
  );
};

export default MovieDetailsModal; 