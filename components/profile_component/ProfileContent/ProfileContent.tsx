import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { GlobalStyle } from "../../../constants/styles";
import AntDesign from '@expo/vector-icons/AntDesign';
import { menuItems } from "../../../constants/AppConstants";

export const ProfileContent = ({ onMenuItemPressed }: any) => {

    const onBackPressHandle = ({ item }: any) => {
        onMenuItemPressed(item);
    }

    const renderMenuItem = ({ item }: any) => (
        <TouchableOpacity style={styles.menuItem} onPress={() => onBackPressHandle({ item })}>
            <View style={styles.iconContainer}>
                <Ionicons name={item.icon} size={24} color={GlobalStyle.primaryColor} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.menuText}>{item.title}</Text>
            </View>
            <View>
                <AntDesign name="right" size={20} color={GlobalStyle.primaryColor} />
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={{ flex: 1 }}>
                <FlatList
                    data={menuItems}
                    keyExtractor={(item) => item.id}
                    renderItem={renderMenuItem}
                    contentContainerStyle={styles.menuList}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        padding: 16,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#e8f0fe',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    menuList: {
        paddingBottom: 16,
    },
    textContainer: {
        flex: 1, // Ensures the text takes up remaining space
        justifyContent: 'center', // Centers the text vertically
        marginRight: 10
    },
    menuText: {
        fontSize: 16,
        color: '#333',
    }
});