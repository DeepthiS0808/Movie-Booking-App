import React from 'react';
import MovieBookingItem from './MovieBookingItem';

const MovieBookingList = ({ movies, bookedMovies, onBookMovie }) => {
  if (!movies || movies.length === 0) {
    return (
      <div className="empty-state">
        <p>No movies available right now.</p>
      </div>
    );
  }

  return (
    <div className="movie-list-container">
      <h2 className="section-title">Now Showing</h2>
      <div className="movie-grid">
        {movies.map(movie => (
          <MovieBookingItem 
            key={movie.id} 
            movie={movie} 
            isBooked={bookedMovies.includes(movie.id)}
            onBook={onBookMovie}
          />
        ))}
      </div>
    </div>
  );
};

export default MovieBookingList;
