import axios from 'axios';

const BASE_URL = 'http://localhost:8080/reservations'; // Adjust the base URL to match your server

const ReservationService = {
  getReservation: async (bookingID) => {
    try {
      const response = await axios.get(`${BASE_URL}/get`, { params: { bookingID } });
      return response.data; // This will return the reservation data
    } catch (error) {
      console.error('Error fetching reservation:', error.response || error.message);
      throw error;
    }
  },

  createReservation: async (reservationData) => {
    try {
      const response = await axios.post(`${BASE_URL}/create`, reservationData);
      return response.data; // This will return the created reservation data
    } catch (error) {
      console.error('Error creating reservation:', error.response || error.message);
      throw error;
    }
  },

  updateReservation: async (bookingID, reservationData) => {
    try {
      const response = await axios.put(`${BASE_URL}/update/${bookingID}`, reservationData);
      return response.data; // This will return the updated reservation data
    } catch (error) {
      console.error('Error updating reservation:', error.response || error.message);
      throw error;
    }
  },

  deleteReservation: async (bookingID) => {
    try {
      await axios.delete(`${BASE_URL}/delete/${bookingID}`);
      // No return value since this is a delete operation
    } catch (error) {
      console.error('Error deleting reservation:', error.response || error.message);
      throw error;
    }
  },

  getAllReservations: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/all`);
      return response.data; // This will return the list of all reservations
    } catch (error) {
      console.error('Error fetching all reservations:', error.response || error.message);
      throw error;
    }
  },
};

export default ReservationService;
