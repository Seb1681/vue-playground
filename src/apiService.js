import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000/api/data', // Replace with your API base URL
  // You can also set headers, authentication, interceptors, etc.
});

export default {
  // Define your API methods here
  fetchData() {
    return apiClient.get('/');
  },
//   createUser(userData) {
//     return apiClient.post('/users', userData);
//   },
};
