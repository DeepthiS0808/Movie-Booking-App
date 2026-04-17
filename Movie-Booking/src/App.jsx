import React, { useState } from 'react';
import './index.css';
import MovieBookingList from './components/MovieBookingList';
import BookingModal from './components/BookingModal';

const MOVIE_DATA = [
  { 
    id: 1, 
    title: 'Inception', 
    genre: 'Sci-Fi', 
    rating: 8.8, 
    price: 12, 
    image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 2, 
    title: 'The Dark Knight', 
    genre: 'Action', 
    rating: 9.0, 
    price: 15, 
    image: 'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 3, 
    title: 'Interstellar', 
    genre: 'Sci-Fi', 
    rating: 8.6, 
    price: 10, 
    image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 4, 
    title: 'Parasite', 
    genre: 'Thriller', 
    rating: 8.5, 
    price: 14, 
    image: 'https://images.unsplash.com/photo-1580130601254-05fa235abeab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
  },
  { 
    id: 5, 
    title: 'Avengers: Endgame', 
    genre: 'Action', 
    rating: 8.4, 
    price: 18, 
    image: 'https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' 
  }
];

function App() {
  const [movies] = useState(MOVIE_DATA);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [totalTickets, setTotalTickets] = useState(0);

  const handleOpenBooking = (movieId) => {
    const movie = movies.find(m => m.id === movieId);
    setSelectedMovie(movie);
  };

  const handleConfirmBooking = (bookingData) => {
    setTotalTickets(prev => prev + bookingData.seats.length);
  };

  return (
    <div className="app-container">
      <header>
        <div className="logo-container">
          <span className="logo">CineStream</span>
        </div>
        <div className="cart-info">
          <span>Tickets</span>
          <span className="cart-count">{totalTickets}</span>
        </div>
      </header>

      <main>
        <MovieBookingList 
          movies={movies} 
          bookedMovies={[]} // Removing simple arrays, we track totalTickets now
          onBookMovie={handleOpenBooking} 
        />
      </main>

      {selectedMovie && (
        <BookingModal 
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
}

export default App;
