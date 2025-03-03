import { useLikedMoviesContext } from '../../context/LikedMoviesContext';
import MovieCard from './MovieCard';

/**
 * LikedMovies component to display movies that the user has liked
 */
const LikedMovies = () => {
  const { likedMovies, toggleLikedMovie, } = useLikedMoviesContext();

  if (likedMovies.length === 0) {
    return (
      <div className="liked-movies-empty">
        <h2>Your Liked Media</h2>
        <p>You haven't liked any media yet. Start exploring and like some movies, shows or video games to see them here!</p>
      </div>
    );
  }

  return (
    <div className="liked-movies-container">
      <h2>Your Liked Media</h2>
      <p className="liked-movies-count">You have {likedMovies.length} like{likedMovies.length === 1 ? '' : 's'}</p>
      
      <div className="movies-grid">
        {likedMovies.map(movie => (
          <MovieCard 
            key={movie.imdbID} 
            movie={movie} 
            isLiked={true}
            onToggleLike={toggleLikedMovie}
          />
        ))}
      </div>
    </div>
  );
};

export default LikedMovies;