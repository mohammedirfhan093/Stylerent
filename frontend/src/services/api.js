import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export const registerUser = (data) => API.post('/users/register/', data);
export const loginUser = (data) => API.post('/users/login/', data);
export const getProducts = (params) => API.get('/products/', { params });
export const getProduct = (id) => API.get(`/products/${id}/`);
export const createProduct = (data) => API.post('/products/create/', data);
export const createBooking = (data) => API.post('/bookings/create/', data);
export const getMyBookings = () => API.get('/bookings/');
export const aiRecommend = (data) => API.post('/ai/recommend/', data);
export const aiSearch = (data) => API.post('/ai/search/', data);