import AsyncStorage from '@react-native-async-storage/async-storage';

const API_IP = 'http://localhost:5000';

export async function registerUser(name, email, password) {
    const res = await fetch(`${API_IP}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    });
    return res.json();
}

export async function loginUser(email, password) {
    const res = await fetch(`${API_IP}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) {
        await AsyncStorage.setItem('token', data.token);
    }
    return data;
}

export async function fetchProducts() {
    const token = await AsyncStorage.getItem('token');
    const res = await fetch(`${API_IP}/app/products`, {
        headers: { 'Authorization': `Bearer ${token}`},
    });
    return res.json();
}