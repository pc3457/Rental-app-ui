import React, { useState, useEffect } from 'react';
import CarRentalService from '../../../services/CarRentalService';
import './CarRentalSearch.css'; 
import ReservationPopUp from './ReservationPopUp';
import ReservationService from '../../../services/ReservationService';

function CarRentalSearch({
    username
}) {
  const [vehicleMakes, setVehicleMakes] = useState([]);
  const [vehicleModels, setVehicleModels] = useState([]);
  const [vehicleLocations, setVehicleLocations] = useState([]);
  const [vehicleLocations1, setVehicleLocations1] = useState([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCity1, setSelectedCity1] = useState('');
  const [carRentals, setCarRentals] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [pickupDate, setpickupDate] = useState('');
  const [dropoffDate, setdropoffDate] = useState('');
  const [selectedRental, setSelectedRental] = useState(null);
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  const [showBookingConfirmedPopup, setShowBookingConfirmedPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');


   useEffect(() => {
    CarRentalService.getUniqueVehicleMakes()
      .then(response => setVehicleMakes(response.data))
      .catch(error => console.error('Error fetching vehicle makes:', error));
  }, []);

  useEffect(() => {
    if (selectedMake) {
      CarRentalService.getUniqueVehicleModels(selectedMake)
        .then(response => setVehicleModels(response.data))
        .catch(error => console.error('Error fetching vehicle models:', error));
    } else {
      setVehicleModels([]);
    }
  }, [selectedMake]);

  useEffect(() => {
    CarRentalService.getUniqueVehicleLocations()
      .then(response => setVehicleLocations(response.data))
      .catch(error => console.error('Error fetching vehicle locations:', error));
  }, []);

  useEffect(() => {
    CarRentalService.getUniqueVehicleLocations()
      .then(response => setVehicleLocations1(response.data))
      .catch(error => console.error('Error fetching vehicle locations:', error));
  }, []);

  const handleSearch = () => {
    CarRentalService.searchCarRentals(selectedMake, selectedModel, selectedCity)
      .then(response => {
        setCarRentals(response.data.slice(0, 10)); // Get the first 10 results
        setShowPopup(true);
      })
      .catch(error => console.error('Error fetching car rentals:', error));
  };

  const handleSelectClick = (carRental) => {
    setSelectedRental(carRental);
    // Assuming you have another state to control the visibility of the booking modal
    setShowBookingPopup(true); // You need to create this state
    // Other logic for selecting the car can be added here
};

const handleConfirmBooking = async () => {

    
    const reservationData = {
      pickupLocation:selectedCity,
      dropoffLocation:selectedCity1,
      pickupDate,
      dropoffDate,
      vehicleMake:selectedMake,
      vehicleModel:selectedModel,
      username,
    };
    try {
        const response = await ReservationService.createReservation(reservationData);
        console.log('Booking confirmed:', response);
       

        setShowBookingConfirmedPopup(true); 
        setTimeout(() => {
            setShowBookingConfirmedPopup(false);
          }, 10000);
        setSelectedRental(null);
        
      }catch (error) {
        console.error('Error confirming booking:', error);
        // Handle specific error here
        if (error.response) {
            // Server responded with a status code outside the 2xx range
            console.error('Server response:', error.response);
        } else if (error.request) {
            // Request was made but no response received
            console.error('No response received:', error.request);
        } else {
            // Something else happened
            console.error('Error:', error.message);
        }
        
    } 
    };

   


const handleBooking = (carRental) => {
    // Placeholder for booking logic
    console.log('Booking car:', selectedRental);
    // Implement the booking logic
    // Hide the selection pop-up
    setShowPopup(false);
    setShowBookingPopup(false); // You need to create this state
    setSelectedRental(null);
};



  return (
    <div className="search-wrapper">
    <div className="search-container">
      <div className="search-field">
        <select value={selectedMake} onChange={e => setSelectedMake(e.target.value)}>
          <option value="">Select Make</option>
          {vehicleMakes.map(make => (
            <option key={make} value={make}>{make}</option>
          ))}
        </select>
      </div>
      <div className="search-field">
        <select value={selectedModel} onChange={e => setSelectedModel(e.target.value)}>
          <option value="">Select Model</option>
          {vehicleModels.map(model => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>
      </div>
      <div className="search-field">
        <select value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
          <option value="">Select Pickup</option>
          {vehicleLocations.map(model => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>
      </div>
      <div className="search-field">
        <select value={selectedCity1} onChange={e => setSelectedCity1(e.target.value)}>
          <option value="">Select DropOff</option>
          {vehicleLocations1.map(model => (
            <option key={model} value={model}>{model}</option>
          ))}
        </select>
      </div>
        <div className="search-field">
          <input
            type="date"
            value={pickupDate}
            onChange={e => setpickupDate(e.target.value)}
          />
        </div>
        <div className="search-field">
          <input
            type="date"
            value={dropoffDate}
            onChange={e => setdropoffDate(e.target.value)}
          />
        </div>
      <button onClick={handleSearch} className="search-button">Search</button>
    </div>

    {showPopup && (
    <div className="popup-container">
    <div className="popup">
      <table>
        <thead>
          <tr>
            <th>Make - Model (Year)</th>
            <th>Type</th>
            <th>City</th>
            <th>State</th>
            <th>Daily Rate</th>
            <th>Fuel Type</th>
            <th>Rating</th>
            <th>Trips Taken</th>
            <th>Reviews</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {carRentals.map((carRental, index) => (
            <tr key={carRental.vehicleReg || index}>
              <td>{carRental.make} {carRental.model} ({carRental.year})</td>
              <td>{carRental.type}</td>
              <td>{carRental.city}</td>
              <td>{carRental.state}</td>
              <td>${carRental.rateDaily}</td>
              <td>{carRental.fuelType}</td>
              <td>{carRental.rating}</td>
              <td>{carRental.renterTripsTaken}</td>
              <td>{carRental.reviewCount}</td>
              <td>
                <button onClick={() => handleSelectClick(carRental)}className="book-button">
                 Select
                </button>
             </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => setShowPopup(false)} className="close-button">Close</button>
    </div>
    </div>
    )}

    {selectedRental &&  (
     <ReservationPopUp
        vehicleMake={selectedMake}
        vehicleModel={selectedModel}
        pickupDate={pickupDate}
        dropoffDate={dropoffDate}
        pickUpLocation={selectedCity}
        dropOffLocation={selectedCity1}
        selectedRental={selectedRental}
        onClose={() => setShowPopup(false)}
     />
    )}

{showBookingPopup && selectedRental && ( // You need to create the showBookingPopup state
        <div className="booking-modal">
        {/* Modal content */}
        <div className="booking-content">
          <h3>Confirm Your Booking</h3>
          <p>{selectedRental.make} {selectedRental.model} ({selectedRental.year})</p>
          <h4>Pick Up Date</h4>
          <p>{pickupDate}</p>
          <h4>Drop Off Date</h4>
          <p>{dropoffDate}</p>
          <h4>Pickup Location</h4>
          <p>{selectedCity}</p>
          <h4>Drop Off Location</h4>
          <p>{selectedCity1}</p>
          {/* More details */}
          <div className="booking-buttons">
            <button onClick={handleConfirmBooking} className="confirm-booking-button">Confirm Booking</button>
            <button onClick={() => setSelectedRental(null)} className="cancel-booking-button">Cancel</button>
          </div>
        </div>
      </div>
      )}
      {showBookingConfirmedPopup && (
            <div className="booking-confirmed-popup">
            <div className="booking-confirmed-content">
              <h2>Booking Confirmed!</h2>
              <button onClick={() => setShowBookingConfirmedPopup(false)} className="close-confirmed-popup-button">
                OK
              </button>
            </div>
          </div>
        )}

        
       
    </div>
  );
}

export default CarRentalSearch;
