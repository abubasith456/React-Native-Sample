import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { GlobalStyle } from "../constants/styles";
import CartScreen from "../screens/CartScreen";

const Tab = createBottomTabNavigator();

export const BottomNavigator = () => {
    return (
        <Tab.Navigator
            id={undefined}
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: styles.tabBar,
                tabBarItemStyle: styles.tabBarItem,
                tabBarActiveTintColor: GlobalStyle.primaryColor, // Active icon color
                tabBarInactiveTintColor: "#7f8c8d", // Inactive icon color
                tabBarLabelStyle: styles.tabBarLabel,
                tabBarIcon: ({ focused }) => {
                    let iconName;
                    if (route.name === "Home") {
                        iconName = focused ? "home-sharp" : "home-outline";
                    } else if (route.name === "Cart") {
                        iconName = focused ? "cart-sharp" : "cart-outline";
                    } else if (route.name === "Profile") {
                        iconName = focused ? "person-sharp" : "person-outline";
                    }

                    return (
                        <Ionicons
                            name={iconName}
                            size={24}
                            color={focused ? GlobalStyle.primaryColor : "#7f8c8d"}
                        />
                    );
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Cart" component={CartScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    );
};

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: "#fff",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        elevation: 10, // Android shadow
        shadowColor: "#000", // iOS shadow color
        shadowOffset: { width: 0, height: -2 }, // iOS shadow position
        shadowOpacity: 0.1, // iOS shadow transparency
        shadowRadius: 4, // iOS shadow blur
        height: 70, // Increase tab bar height
        borderTopColor: "#ecf0f1",
        position: 'absolute',
    },
    tabBarItem: {
        paddingVertical: 10, // Increase touch area
    },
    tabBarLabel: {
        fontSize: 12,
        fontWeight: "600",
        paddingBottom: 5, // Adjust spacing for labels
    },
});