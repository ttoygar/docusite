import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const login = async (username, password) => {
  const response = await axios.post(`${API_URL}/token/`, { username, password });
  if (response.data.access) {
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
  }
  return response;
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  delete axios.defaults.headers.common['Authorization'];
};

export const getCurrentUser = () => {
  return localStorage.getItem('access_token');
};

export const refreshToken = async () => {
  const refresh_token = localStorage.getItem('refresh_token');
  try {
    const response = await axios.post(`${API_URL}/token/refresh/`, { refresh: refresh_token });
    localStorage.setItem('access_token', response.data.access);
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
    return response.data.access;
  } catch (error) {
    logout();
    window.location.href = '/'; // Redirect to login page
    return null;
  }
};
