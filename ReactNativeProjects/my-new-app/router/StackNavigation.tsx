import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import SearchProductsScreen from '../screens/SearchProductsScreen';
import ProductDetailsScreen from '../screens/ProdectDetailsScreen';
import { BottomNavigator } from './BottomNavigation';
import { EditProfileScreen } from '../screens/EditProfileScreen';

const Stack = createStackNavigator();

export const StackNagivation = () => {
    return (
        <NavigationContainer >
            <Stack.Navigator id={undefined}>
                <Stack.Screen name='Home' component={BottomNavigator} options={{
                    headerShown: false
                }} />
                <Stack.Screen name="Search" component={SearchProductsScreen} />
                <Stack.Screen name='ProductDetails' component={ProductDetailsScreen} />
                <Stack.Screen name='EditProfile' component={EditProfileScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}