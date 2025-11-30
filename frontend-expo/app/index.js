
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginUI from "./screens/LoginUI";
import ProductsList from "./screens/ProductList";
import RegisterUI from "./screens/RegisterUi";
import AdminUI from "./screens/AdminUi";
import CartUi from "./screens/CartUi";
import { Button, View } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginUI} />
        <Stack.Screen name="Register" component={RegisterUI} />
        <Stack.Screen name="Products" component={ProductsList} options={({navigation}) => ({ headerRight: () => (
          <View style={{flexDirection: 'row', gap: 10}}>
          <Button title="Cart" onPress={() => navigation.navigate('Cart')} />
          <Button title="Admin" onPress={() => navigation.navigate('Admin')} />
          </View>
        )})} />
        <Stack.Screen name="Admin" component={AdminUI} />       
        <Stack.Screen name="Cart" component={CartUi} />
      </Stack.Navigator>
  );
}
