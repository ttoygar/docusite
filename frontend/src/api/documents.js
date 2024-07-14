import axiosInstance from './axiosConfig';

export const fetchDocuments = async () => {
  const response = await axiosInstance.get('/documents/');
  return response.data;
};

export const fetchDocument = async (id) => {
  const response = await axiosInstance.get(`/documents/${id}/`);
  return response.data;
};

export const createDocument = async (document) => {
  const response = await axiosInstance.post('/documents/', document);
  return response.data;
};

export const updateDocument = async (id, document) => {
  const response = await axiosInstance.put(`/documents/${id}/`, document);
  return response.data;
};
