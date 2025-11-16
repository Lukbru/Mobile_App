import {useState, useEffect} from "react";
import {ScrollView, View, Text, StyleSheet, FlatList, Image} from "react-native";
import {fetchProducts} from '../serverReqs';

export default function ProductList({ navigation }) {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProducts().then(product => {
            if (product.products) { setProducts(product.products) }
            else setError(product.message);
        });
    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Product List</Text>
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <FlatList data={products} keyExtractor={(item) => item._id.toString()} renderItem={({item}) => (
                <View style={styles.item}>
                    {item.imageUrl ? <Image source = {{uri: item.imageUrl}} style = {styles.productImage} resizeMode="contain"/> : null}
                    <Text style={styles.productName}>{item.title}</Text>
                    <Text>{item.description}</Text>
                    <Text>{item.price} zł</Text>
                </View>
            )}/>
        </ScrollView>
    );
}


const styles = StyleSheet.create({
    container: {flex: 1, justifyContent: 'center', padding: 20},
    title: {fontSize: 30, textAlign: 'center', marginBottom: 20},
    item: {borderBottomWidth: 1, borderBottomColor: '#2b2b2bff', padding: 10},
    name: {fontWeight: 'bold'},
    error: {color: 'red', marginBottom: 10, textAlign: 'center'},
    productImage : {width: '100%', height: 200, marginBottom: 10, borderRadius: 8}
});

