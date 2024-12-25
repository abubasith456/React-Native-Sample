import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SearchProductsScreen from '../screens/SearchProductsScreen';
import ProductDetailsScreen from '../screens/ProdectDetailsScreen';
import { BottomNavigator } from './BottomNavigation';
import { EditProfileScreen } from '../screens/EditProfileScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { SignUpScreen } from '../screens/auth/SignUpScreen';
import { SplashScreen } from '../screens/auth/SplashScreen';

const Stack = createStackNavigator();

export const StackNagivation = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator id={undefined} initialRouteName='Splash'>
                <Stack.Screen name='Splash' component={SplashScreen} options={{
                    headerShown: false
                }} />
                <Stack.Screen name='Home' component={BottomNavigator} options={{
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
            </Stack.Navigator>
        </NavigationContainer>
    );
}