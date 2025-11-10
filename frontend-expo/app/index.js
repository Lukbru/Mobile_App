
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginUI from "./screens/LoginUI";
import ProductsList from "./screens/ProductList";
import RegisterUI from "./screens/RegisterUi";


const Stack = createNativeStackNavigator();

export default function App() {
  return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginUI} />
        <Stack.Screen name="Register" component={RegisterUI} />
        <Stack.Screen name="Products" component={ProductsList} />
      </Stack.Navigator>
  );
}