import {View, Text, StyleSheet, Image, ScrollView} from "react-native";

export default function ProductDetails({route, navigation}) {
    const {product} = route.params;
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.name}>{product.name}</Text>
            <Image source={{uri: product.imageUrl}} style={styles.image} resizeMode="contain"/>
            <Text style={styles.price}>{product.price} zł</Text>
            <Text style={styles.description}>{product.description}</Text>
        </ScrollView>
    );
}  

const styles = StyleSheet.create({
    container: {padding: 20, alignItems: 'center'},
    image: {width: '100%', height: 300, marginBottom: 20},
    name: {fontSize: 24, fontWeight: 'bold', marginBottom: 10},
    price: {fontSize: 20, color: 'green', marginBottom: 10},
    description: {fontSize: 16, marginBottom: 20},
});