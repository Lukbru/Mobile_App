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
        await AsyncStorage.setItem('user', JSON.stringify(data.user));
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

export async function fetchCategories() {
    const res = await fetch (`${API_IP}/category`);
    return await res.json();
}

export async function addCategory(data) {
    const res = await fetch(`${API_IP}/category`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function addProduct(data) {
    const res = await fetch(`${API_IP}/app/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return res.json();
}

export async function addToCart({userId, productId, price, email}) {
    const res = await fetch(`${API_IP}/cart`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userId, productId, price, email}),
    });
    return res.json();
}

export async function fetchCart(userId) {
    const res = await fetch(`${API_IP}/cart/${userId}`, {
        headers: { 'Content-Type': 'application/json' },
    });
    return res.json();
}

export async function removeFromCart(cartItemId) {
    const res = await fetch(`${API_IP}/cart/${cartItemId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });
    return res.json();
}
