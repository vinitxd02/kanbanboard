import axios from 'axios';

const API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

export const fetchTasks = () => {
  return axios.get(API_URL)
    .then(response => response.data.tickets)
    .catch(error => {
      throw error;
    });
};
export const fetchUsers = () => {
    return axios.get(API_URL)
      .then(response => response.data.users)
      .catch(error => {
        throw error;
      });
  };