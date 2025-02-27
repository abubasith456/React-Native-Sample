import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SearchProductsScreen from '../screens/SearchProductsScreen';
import ProductDetailsScreen from '../screens/ProdectDetailsScreen';
import { BottomNavigator } from './BottomNavigation';
import { EditProfileScreen } from '../screens/EditProfileScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { SignUpScreen } from '../screens/auth/SignUpScreen';
import { SplashScreen } from '../screens/auth/SplashScreen';
import { ProductsScreen } from '../screens/ProductsScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import { NewHomeScreen } from '../screens/NewHomeScreen';
import AddressScreen from '../screens/AddressScreen';

const Stack = createStackNavigator();

export const StackNagivation = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator id={undefined} initialRouteName='Splash'>
                <Stack.Screen name='Splash' component={SplashScreen} options={{
                    headerShown: false
                }} />
                <Stack.Screen name='HomeScreen' component={BottomNavigator} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="Search" component={SearchProductsScreen} />
                <Stack.Screen name='ProductDetails' component={ProductDetailsScreen} />
                <Stack.Screen name='EditProfile' component={EditProfileScreen} />
                <Stack.Screen name='Login' component={LoginScreen} options={{
                    headerShown: false
                }} />
                <Stack.Screen name='Signup' component={SignUpScreen} options={{
                    headerShown: false
                }} />
                <Stack.Screen name='Products' component={ProductsScreen} />
                <Stack.Screen name='OrderHistory' component={OrderHistoryScreen} options={{
                    headerShown: false
                }} />

                <Stack.Screen name="Address" component={AddressScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}