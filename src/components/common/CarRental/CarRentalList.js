import React, { useEffect, useState } from 'react';
import CarRentalService from '../../../services/CarRentalService';

function CarRentalList() {
  const [carRentals, setCarRentals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    CarRentalService.getAllCarRentals()
      .then(response => {
        setCarRentals(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setError('Failed to load car rentals.');
        setIsLoading(false);
      });
  }, []);

  return (
    <div>
      <h2>Car Rentals</h2>
      {isLoading ? (
        <p>Loading car rentals...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul className="car-rental-list">
      {carRentals.map((carRental, index)=> (
        <li key={carRental.vehicleReg || index} className="car-rental-item">
          {carRental.vehicleMake}
        </li>
      ))}
    </ul>
      )}
    </div>
  );
}

export default CarRentalList;
