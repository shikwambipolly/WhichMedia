import { useState } from 'react';
import { MovieCardProps } from '../../types/component.types';
// Import SVG icons
import mediaSvg from '../../assets/media.svg';
import videoGameSvg from '../../assets/video-game.svg';
import likeSvg from '../../assets/like.svg';
import MovieDetailsModal from '../ui/MovieDetailsModal';

/**
 * MovieCard component for displaying individual movie information
 */
const MovieCard = ({ movie, isLiked, onToggleLike }: MovieCardProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [animate, setAnimate] = useState(false); // Track animation state

    /**
     * Determine which placeholder image to use based on media type
     */
    const getPlaceholderImage = () => {
        if (movie.Type === 'game') {
            return videoGameSvg;
        }
        return mediaSvg; // Default for movies and series
    };

    // Open the modal when clicking on the card
    const handleClick = () => {
        setIsModalOpen(true);
    };

    // Close the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Handle like button click
    const handleLikeClick = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent opening modal when clicking the like button
        if (onToggleLike) {
            setAnimate(true); // Trigger animation
            
            // Remove animation class after animation completes
            setTimeout(() => {
                setAnimate(false);
            }, 600); // Slightly longer than animation duration
            
            onToggleLike(movie);
        }
    };

    return (
        <>
            <div className="movie-card" onClick={handleClick}>
                <div className="movie-poster-container">
                    {movie.Poster && movie.Poster !== "N/A" ? (
                        <img 
                            src={movie.Poster} 
                            alt={`Poster for ${movie.Title}`} 
                            className="movie-poster-img"
                        />
                    ) : (
                        <div className="no-poster">
                            <img 
                                src={getPlaceholderImage()} 
                                alt={`${movie.Type} icon for ${movie.Title}`}
                                className="placeholder-img"
                            />
                        </div>
                    )}
                    <div className="view-details-overlay">
                        <span>View Details</span>
                    </div>
                </div>
                <div className="movie-details">
                    <div className="movie-title-container">
                        <h3 className="movie-title">{movie.Title}</h3>
                        <button
                            className={`like-button-title ${isLiked ? 'liked' : ''} ${animate ? 'animate' : ''}`}
                            onClick={handleLikeClick}
                            aria-label={isLiked ? "Unlike movie" : "Like movie"}
                            title={isLiked ? "Unlike movie" : "Like movie"}
                        >
                            <img src={likeSvg} alt="Like" className="like-icon" />
                        </button>
                    </div>
                    <div className="movie-info">
                        <span className="movie-year">{movie.Year}</span>
                        <span className="movie-type">{movie.Type}</span>
                    </div>
                </div>
            </div>
            
            {isModalOpen && (
                <MovieDetailsModal
                    imdbID={movie.imdbID}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </>
    );
};

export default MovieCard; 