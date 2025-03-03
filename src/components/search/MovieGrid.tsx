import { MovieGridProps } from '../../types/component.types';  
import MovieCard from './MovieCard';
import { useLikedMoviesContext } from '../../context/LikedMoviesContext';

/**
 * MovieGrid component for displaying a grid of movies
 */
const MovieGrid = ({ movies }: MovieGridProps) => {
    const { toggleLikedMovie, isMovieLiked } = useLikedMoviesContext();
    
    if (movies.length === 0) {
        return <div className="no-results">No movies found.</div>;
    }
    
    return (
        <div className="movies-grid">
            {movies.map(movie => (
                <MovieCard 
                    key={movie.imdbID} 
                    movie={movie} 
                    isLiked={isMovieLiked(movie.imdbID)}
                    onToggleLike={toggleLikedMovie}
                />
            ))}
        </div>
    );
};

export default MovieGrid; 