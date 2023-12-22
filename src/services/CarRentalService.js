import axios from 'axios';

const BASE_URL = 'http://localhost:8080/carrental'; // Adjust if your base URL is different

const CarRentalService = {
  createCarRental: function(carRentalData) {
    return axios.post(`${BASE_URL}/update`, carRentalData);
  },

  getAllCarRentals: function() {
    return axios.get(`${BASE_URL}/get/all`);
  },

  searchCarRentals: function(vehicleMake, vehicleModel, city) {
    // Assuming vehicleMake and vehicleModel are passed as query parameters
    return axios.get(`${BASE_URL}/search`, {
      params: {
        vehicleMake,
        vehicleModel,
        city
      }
    });
  },

  updateCarRental: function(vehicleReg, carRentalData) {
    return axios.put(`${BASE_URL}/update/${vehicleReg}`, carRentalData);
  },

  deleteCarRental: function(vehicleReg) {
    return axios.delete(`${BASE_URL}/delete/${vehicleReg}`);
  },
  getUniqueVehicleMakes: function() {
    return axios.get(`${BASE_URL}/unique-makes`);
},

getUniqueVehicleModels: function(vehicleMake) {
    return axios.get(`${BASE_URL}/unique-models`, {
        params: {
            vehicleMake
        }
    });
},
getUniqueVehicleLocations: function() {
    return axios.get(`${BASE_URL}/unique-locations`);
  }
};

export default CarRentalService;
