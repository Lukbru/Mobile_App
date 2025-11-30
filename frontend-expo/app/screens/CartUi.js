import { useState, useEffect } from "react";
import {TextInput, ScrollView, View, Text, StyleSheet, FlatList, Image, Button} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchCart, removeFromCart } from '../serverReqs';

export default function CartUi() {
    const [cartItems, setCartItems] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = async () => {
        const userData = await AsyncStorage.getItem('user');
        if (!userData) return;
        const user = JSON.parse(userData);
        const data = await fetchCart(user._id);
        setCartItems(data); 
    };

    const removeItem = async (itemId) => {
        await removeFromCart(itemId);
        loadCart();
    };

    const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Your Cart</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <FlatList data ={cartItems} keyExtractor={(item) => item._id.toString()} renderItem={({item}) => (
                <View style={styles.item}>
                    <Text style={styles.name}>{item.product.name}</Text>
                    <Text style={styles.price}>{item.price} zł</Text>
                    <Button title="Remove" color='red' onPress={() => removeItem(item._id)} />
                </View>
            )} />
            <Text style={styles.total}>Total: {totalPrice} zł</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, padding: 20},
    title: {fontSize: 30, textAlign: 'center', marginBottom: 20},
    item: {borderBottomWidth: 1, borderBottomColor: '#ccc', paddingVertical: 10},
    name: {fontWeight: 'bold', fontSize: 18},
    price: {fontSize: 16, marginBottom: 10},
    total: {fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 20},
    error: {color: 'red', marginBottom: 10, textAlign: 'center'},
});