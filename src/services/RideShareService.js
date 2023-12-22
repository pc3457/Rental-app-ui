import axios from 'axios';

const BASE_URL = 'http://localhost:8080'; // Replace with your actual backend URL

const RideShareService = {
  getAllRideShares: function() {
    return axios.get(`${BASE_URL}/rideshare`);
  },

  getRideShare: function(id) {
    return axios.get(`${BASE_URL}/rideshare/${id}`);
  },

  createRideShare: function(rideShareData) {
    return axios.post(`${BASE_URL}/rideshare`, rideShareData);
  },

  updateRideShare: function(id, rideShareData) {
    return axios.put(`${BASE_URL}/rideshare/${id}`, rideShareData);
  },

  deleteRideShare: function(id) {
    return axios.delete(`${BASE_URL}/rideshare/${id}`);
  }
};

export default RideShareService;
