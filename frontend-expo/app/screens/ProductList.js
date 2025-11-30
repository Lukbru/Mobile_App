import {useState, useEffect} from "react";
import {TextInput, ScrollView, View, Text, StyleSheet, FlatList, Image, Button} from "react-native";
import {fetchProducts, fetchCategories, addToCart} from '../serverReqs';
import CategoryTree from "../categoryTree";
import { getAllSubCategoryIds } from "../categoryTreeBuild";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProductList({ navigation }) {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        fetchProducts().then(product => {
            if (product.products) { setProducts(product.products) }
            else setError(product.message);
        });
        fetchCategories().then(categoryData => {
            if (Array.isArray(categoryData)) { setCategories(categoryData) }
            else setError(categoryData.message);
        });
    }, []);

    useEffect(() => {
        filterProducts();
    }, [products, search, selectedCategory]);

    const filterProducts = () => {
        let filter = products;
        if (selectedCategory !== 'all') {
            filter = filter.filter(product =>  {
                const id = (product.categoryId?._id || product.categoryId || '').toString();
                return selectedCategoryIds.includes(id);
            });
        }
        if (search.trim() !== '') {
            filter = filter.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));
        }
        setFilteredProducts(filter);
    }

    const onSelectCategory = (categoryId) => {
        if (categoryId === 'all') {
            setSelectedCategory('all');
            setSelectedCategoryIds([]);
            return
        }
        const ids = getAllSubCategoryIds(categoryId, categories);
        setSelectedCategory(categoryId);
        setSelectedCategoryIds(ids);
    }

    const addItemToCart = async (products) => {
        const loggedUser = await AsyncStorage.getItem('user');
        if (!loggedUser) return
        const user = JSON.parse(loggedUser);
        const body = {
            userId: user._id,
            productId: products._id,
            price: products.price,
            email: user.email
        }
        const res = await addToCart(body);
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Product List</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <TextInput placeholder="Search Products..." value={search} onChangeText={setSearch} style={styles.input} />
            <CategoryTree categories={categories} onSelectCategory={onSelectCategory} />
            <FlatList data={filteredProducts} keyExtractor={(item) => item._id.toString()} renderItem={({item}) => (
                <View style={styles.item}>
                    <Text style={styles.name}>{item.name}</Text>
                    {item.imageUrl ? <Image source = {{uri: item.imageUrl}} style = {styles.productImage} resizeMode="contain"/> : null}
                    <Text>{item.description}</Text>
                    <Text>{item.price} zł</Text>
                    <Button title="Add to Cart" color='#6ea72aff' onPress={() => addItemToCart(item)} />
                </View>
            )}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', padding: 20},
    title: {fontSize: 30, textAlign: 'center', marginBottom: 20},
    item: {borderBottomWidth: 1, borderBottomColor: '#2b2b2bff', padding: 10, },
    name: {fontWeight: 'bold', textAlign: 'center', fontSize: 18},
    error: {color: 'red', marginBottom: 10, textAlign: 'center'},
    productImage : {width: '100%', height: 200, marginBottom: 10, borderRadius: 8},
    input: {borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 6},
});

