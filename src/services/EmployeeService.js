import axios from 'axios';

const BASE_URL = 'http://localhost:8080/employee'; // Replace with your actual base URL

const EmployeeService = {
  addEmployee: async (employeeData) => {
    try {
      const response = await axios.post(`${BASE_URL}/employees/add`, employeeData);
      return response.data;
    } catch (error) {
      // Handle errors here, such as logging or throwing an error to be caught by the caller
      console.error('Error adding employee:', error.response || error.message);
      throw error;
    }
  },
  
  // ... other service methods for employees
};

export default EmployeeService;
