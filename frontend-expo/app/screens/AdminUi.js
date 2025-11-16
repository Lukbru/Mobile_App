import React, {useState, useEffect} from "react";
import {ScrollView, View, Text, StyleSheet, Button, TextInput, FlatList, Image} from "react-native";
import {fetchCategories, addCategory, addProduct} from '../serverReqs';
import { Picker } from '@react-native-picker/picker';

export default function AdminUi() {
    //  Category
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState('');
    const [categoryLevel, setCategoryLevel] = useState(1);
    const [parentCategoryId, setParentCategoryId] = useState('');
    // Product
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productImageUrl, setProductImageUrl] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        const data = await fetchCategories();
        setCategories(data);
    };

    const addCategories  = async () => {
        const body = {
            name: categoryName,
            level: Number(categoryLevel),
            parentCategoryId: categoryLevel > 1 ? parentCategoryId : '',
        }
        const result = await addCategory(body);
        if (result.id){
            loadCategories();
            setCategoryName('');
        } else {
            alert(result.message);
        }
}
    const addProducts = async () => {
        const body = {
            name: productName,
            description: productDescription || '',
            price: Number(productPrice),
            categoryId: selectedCategory || '',
            imageUrl: productImageUrl,
        }
        const result = await addProduct(body);
        if (result.id){
            setProductName('');
            setProductDescription('');
            setProductPrice('');
            setProductImageUrl('');
        } else {
            alert(result.message);
        }
    };
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Admin Panel</Text>

            <Text style={styles.sectionTitle}>Add Category</Text>
            <TextInput value={categoryName} onChangeText={setCategoryName} placeholder="Category Name" style={styles.input}/>
            <TextInput value={String(categoryLevel)} onChangeText={(value) => setCategoryLevel(Number(value))} placeholder="Level (1, 2, 3 ...)" style={styles.input} keyboardType="numeric"/>
            {categoryLevel > 1 && (
                <Picker selectedValue={parentCategoryId} onValueChange={setParentCategoryId}>
                    <Picker.Item label="Select Parent Category" value=''/>
                    {categories.map((cat) => (
                        <Picker.Item key={cat._id} label={cat.name} value={cat._id}/>
                    ))}
                </Picker>
            )}
            <Button title="Add Category" onPress={addCategories}/>
            <View style={styles.divider}/>

            <Text style={styles.sectionTitle}>Add Product</Text>
            <TextInput value={productName} onChangeText={setProductName} placeholder="Product Name" style={styles.input}/>
            <TextInput value={productDescription} onChangeText={setProductDescription} placeholder="Product Description" style={styles.input}/>
            <TextInput value={productPrice} onChangeText={setProductPrice} placeholder="Product Price" style={styles.input} keyboardType="numeric"/>
            <TextInput value={productImageUrl} onChangeText={setProductImageUrl} placeholder="Product Image URL" style={styles.input}/>
            <Picker selectedValue={selectedCategory} onValueChange={setSelectedCategory}>
                <Picker.Item label="Select Category" value=''/>
                {categories.map((cat) => (
                    <Picker.Item key={cat._id} label={cat.name} value={cat._id}/>
                ))}
            </Picker>
            <Button title="Add Product" onPress={addProducts}/>
            <View style={styles.divider}/>
            <Text style={styles.sectionTitle}>Existing Categories</Text>
            <FlatList data={categories} keyExtractor={(item) => item._id} renderItem={({item}) => (
                <Text style={{padding:5}}>
                    {Array(item.level).fill('-').join('')} {item.name}
                </Text>
            )}/>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {flex: 1, padding: 20},
    title: {fontSize: 30, textAlign: 'center', marginBottom: 20},
    sectionTitle: {fontSize: 20, marginTop: 20, marginBottom: 10},
    input: {borderWidth: 1, borderColor: '#a3a3a3ff', padding: 10, marginBottom: 10},
    divider: {height: 1, backgroundColor: '#bbbbbbff', marginVertical: 20},
});
