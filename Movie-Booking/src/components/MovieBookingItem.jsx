import React from 'react';

const MovieBookingItem = ({ movie, isBooked, onBook }) => {
  return (
    <div className="movie-card">
      <div className="movie-image-wrapper">
        <img src={movie.image} alt={movie.title} className="movie-image" />
        <div className="movie-overlay"></div>
        <div className="movie-rating">
          ⭐ {movie.rating}
        </div>
      </div>
      
      <div className="movie-details">
        <span className="movie-genre">{movie.genre}</span>
        <h3 className="movie-title">{movie.title}</h3>
        
        <div className="movie-footer">
          <div className="movie-price">
            ${movie.price}<span>/ticket</span>
          </div>
          <button 
            className={`book-btn ${isBooked ? 'booked' : ''}`}
            onClick={() => onBook(movie.id)}
            disabled={isBooked}
          >
            {isBooked ? 'Booked' : 'Book Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieBookingItem;
