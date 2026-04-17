import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const BookingModal = ({ movie, onClose, onConfirm }) => {
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Generate some realistic fake dates
  const today = new Date();
  const dates = Array.from({ length: 4 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    return {
      value: d.toISOString().split('T')[0],
      label: i === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
    };
  });

  const timings = ['10:30 AM', '01:15 PM', '04:00 PM', '07:45 PM', '10:30 PM'];
  
  const handleSeatClick = (seatIndex) => {
    if (selectedSeats.includes(seatIndex)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seatIndex));
    } else {
      setSelectedSeats([...selectedSeats, seatIndex]);
    }
  };

  const handleConfirm = () => {
    setStep(2); // Move to ticket view
  };

  const handleClose = () => {
    if (step === 2) {
      onConfirm({
        movie,
        date: selectedDate,
        time: selectedTime,
        seats: selectedSeats
      });
    }
    onClose();
  };

  // 4 rows of 8 seats
  const renderSeats = () => {
    let seatMap = [];
    for (let r = 0; r < 4; r++) {
      let row = [];
      for (let c = 0; c < 8; c++) {
        const seatIndex = r * 8 + c;
        // make some seats randomly booked for demo
        const isPreBooked = (seatIndex % 7 === 0) || (seatIndex === 12);
        const isSelected = selectedSeats.includes(seatIndex);
        
        row.push(
          <div 
            key={seatIndex} 
            className={`seat ${isPreBooked ? 'booked' : ''} ${isSelected ? 'selected' : ''}`}
            onClick={() => !isPreBooked && handleSeatClick(seatIndex)}
          >
            {c + 1}
          </div>
        );
      }
      seatMap.push(<div key={r} className="seat-row">{row}</div>);
    }
    return seatMap;
  };

  const isFormComplete = selectedDate && selectedTime && selectedSeats.length > 0;
  const totalPrice = selectedSeats.length * movie.price;

  // JSON string for QR Code
  const qrData = JSON.stringify({
    id: movie.id,
    title: movie.title,
    date: selectedDate,
    time: selectedTime,
    seats: selectedSeats.length
  });

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        {step === 1 && (
          <div className="modal-content">
            <h2 className="modal-title">Book Tickets - {movie.title}</h2>
            
            <div className="booking-form">
              <div className="form-group">
                <label>Select Date</label>
                <div className="options-flex">
                  {dates.map(d => (
                    <button 
                      key={d.value}
                      className={`option-btn ${selectedDate === d.value ? 'active' : ''}`}
                      onClick={() => setSelectedDate(d.value)}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Select Timing</label>
                <div className="options-flex">
                  {timings.map(t => (
                    <button 
                      key={t}
                      className={`option-btn ${selectedTime === t ? 'active' : ''}`}
                      onClick={() => setSelectedTime(t)}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label>Select Seats</label>
                <div className="screen-indicator">Screen This Way</div>
                <div className="seat-map">
                  {renderSeats()}
                </div>
                <div className="seat-legend">
                  <span className="legend-item"><span className="seat small"></span> Available</span>
                  <span className="legend-item"><span className="seat small selected"></span> Selected</span>
                  <span className="legend-item"><span className="seat small booked"></span> Booked</span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <div className="price-info">
                <span>Total Amount:</span>
                <strong>${totalPrice}</strong>
              </div>
              <button 
                className="btn-primary" 
                onClick={handleConfirm}
                disabled={!isFormComplete}
              >
                Confirm Booking
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="modal-content ticket-success">
            <h2 className="modal-title success-text">Booking Confirmed! 🎉</h2>
            <p>Your tickets have been successfully booked.</p>
            
            <div className="digital-ticket">
              <div className="ticket-header">
                <h3>{movie.title}</h3>
                <span className="ticket-rating">⭐ {movie.rating}</span>
              </div>
              <div className="ticket-body">
                <div className="ticket-details-grid">
                  <div className="detail-item">
                    <span className="label">Date</span>
                    <span className="value">{dates.find(d => d.value === selectedDate)?.label}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Time</span>
                    <span className="value">{selectedTime}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Tickets</span>
                    <span className="value">{selectedSeats.length} Seat(s)</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Amount Paid</span>
                    <span className="value">${totalPrice}</span>
                  </div>
                </div>
                <div className="ticket-qr">
                  <div className="qr-container">
                    <QRCodeSVG value={qrData} size={130} level="M" fgColor="#0b0c10" bgColor="#ffffff" />
                  </div>
                  <p className="scan-text">Scan at entry</p>
                </div>
              </div>
            </div>

            <button className="btn-primary w-full" onClick={handleClose}>
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingModal;
