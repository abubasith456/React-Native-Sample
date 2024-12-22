import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();

export const BottomNavigator = () => {
    return (<Tab.Navigator
        id={undefined}
        screenOptions={{
            headerShown: false,

        }}>
        <Tab.Screen name="Home" component={HomeScreen} options={{
            tabBarIcon: () => {
                return <Ionicons name="home" size={20} />
            }
        }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{
            tabBarIcon: (focused) => {
                return <Ionicons name="person" size={20} />
            }
        }} />
    </Tab.Navigator>);
}