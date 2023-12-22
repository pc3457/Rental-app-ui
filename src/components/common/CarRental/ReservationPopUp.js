import React from 'react';
import './ReservationPopup.css'; // Make sure to create a corresponding CSS file

function ReservationPopup({
    vehicleMake,
    vehicleModel,
    pickUpDate,
    dropOffDate,
    pickUpLocation,
    dropOffLocation,
    selectedRental,
    onClose
  }) {
    return (
      <div className="reservation-popup">
        <div className="reservation-details">
          <h2>COMPLETE RESERVATION</h2>
          <div className="location-date-details">
            <p>Pick-Up Date & Time: {pickUpDate}</p>
            <p>Drop-Off Date & Time: {dropOffDate}</p>
            <p>Pick-Up Location: {pickUpLocation}</p>
            <p>Drop-Off Location: {dropOffLocation}</p>
          </div>
          <div className="car-details">
            <h3>Car - {vehicleMake} {vehicleModel}</h3>
            {/* Display car image if available */}
            {selectedRental?.image && <img src={selectedRental.image} alt="Car" />}
          </div>
          <button onClick={onClose} className="close-button">Close</button>
        </div>
      </div>
    );
  }
  
  export default ReservationPopup;
  