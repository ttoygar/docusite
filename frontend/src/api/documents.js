import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const fetchDocuments = async () => {
  const token = localStorage.getItem('access_token');
  const response = await axios.get(`${API_URL}/documents/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchDocument = async (id) => {
  const token = localStorage.getItem('access_token');
  const response = await axios.get(`${API_URL}/documents/${id}/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const createDocument = async (document) => {
  const token = localStorage.getItem('access_token');
  const response = await axios.post(`${API_URL}/documents/`, document, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateDocument = async (id, document) => {
  const token = localStorage.getItem('access_token');
  const response = await axios.put(`${API_URL}/documents/${id}/`, document, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const fetchCategories = async () => {
  const token = localStorage.getItem('access_token');
  const response = await axios.get(`${API_URL}/categories/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
