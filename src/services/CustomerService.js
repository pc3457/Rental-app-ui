import axios from 'axios';

// Base URL of your backend server
const BASE_URL = 'http://localhost:8080/api/users';

const CustomerService = {

    signIn: function(username, password) {
        return axios.post(`${BASE_URL}/sign-in`, { username, password });
      },
    addCustomer: (customerData) => {
        return axios.post(`${BASE_URL}/add`, customerData);
    },

    getCustomerByUsername: (username) => {
        return axios.get(`${BASE_URL}/${username}`);
    },

    updateCustomer: (username, customerData) => {
        return axios.put(`${BASE_URL}/update/${username}`, customerData);
    },

    deleteCustomer: (username) => {
        return axios.delete(`${BASE_URL}/delete/${username}`);
    },

    getAllCustomers: () => {
        return axios.get(`${BASE_URL}/all`);
    }
};

export default CustomerService;
