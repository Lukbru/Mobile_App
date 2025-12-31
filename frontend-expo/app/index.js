
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginUI from "./screens/LoginUI";
import ProductsList from "./screens/ProductList";
import RegisterUI from "./screens/RegisterUi";
import AdminUI from "./screens/AdminUi";
import CartUi from "./screens/CartUi";
import ProductDetails from "./screens/ProductDetails";
import { Button, View } from "react-native";

import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();

export default function App() {

   const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const userData = await AsyncStorage.getItem('user');
      if (!userData) return;
      const user = JSON.parse(userData);
      setIsAdmin(user.isAdmin === true);
    };

    loadUser();
  }, []);

  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginUI} />
        <Stack.Screen name="Register" component={RegisterUI} />
        <Stack.Screen name="Products" component={ProductsList} options={({navigation}) => ({ headerRight: () => (
          <View style={{flexDirection: 'row', gap: 10, marginRight: 10}}>
          <Button title="Cart" onPress={() => navigation.navigate('Cart')} />
            { isAdmin && (
          <Button title="Admin" onPress={() => navigation.navigate('Admin')} />
            )}
          </View>
        )})} />
        <Stack.Screen name="Admin" component={AdminUI} />       
        <Stack.Screen name="Cart" component={CartUi} />
        <Stack.Screen name="ProductDetails" component={ProductDetails} />
      </Stack.Navigator>
  );
}
