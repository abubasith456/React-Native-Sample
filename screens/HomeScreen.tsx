import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    Image,
    Alert,
} from "react-native"
import { RootState, useAppDispatch, useAppSelector } from "../core/state_management/store";
import { useEffect } from "react";
import { fetchHome } from "../core/api/UserRepo";
import { HomeHeader } from "../components/home_components/HomeHeader";
import { HomeBanner } from "../components/home_components/HomeBanner";
import { categoriesData, productsData, recentPurchasesData } from "../constants/ApiSampleResponse";

export const HomeScreen = ({ navigation }: any) => {
    const dispatch = useAppDispatch();
    const { loading, data, error, errorMessage } = useAppSelector((state: RootState) => state.homeApi);
    const userData = data?.data.user
    const userId = "11"

    console.log(" data ===> " + data);

    useEffect(() => {
        dispatch(fetchHome({ userId }))
        if (error && !loading) {
            Alert.alert("Error", errorMessage ? errorMessage : "Something went wrong!");
        }
    }, []);

    const renderCategoryItem = ({ item }: any) => (
        <View style={styles.categoryItem}>
            <Image source={{ uri: item.image }} style={styles.categoryIcon} />
            <Text style={styles.categoryName}>{item.name}</Text>
        </View>
    );

    const renderProductItem = ({ item }: any) => (
        <View style={styles.productCard}>
            <Image source={{ uri: item.productImage }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>Rs.{item.price}</Text>
        </View>
    );

    const renderRecentPurchaseItem = ({ item }: any) => (
        <View style={styles.recentPurchaseItem}>
            <Image source={{ uri: "https://via.placeholder.com/100" }} style={styles.recentPurchaseIcon} />
            <View>
                <Text style={styles.recentPurchaseName}>Recent Item Name</Text>
                <Text style={styles.recentPurchaseDate}>Purchased At?</Text>
            </View>
        </View>
    );

    const getRecentPurchaseData = () => {
        const response = data?.data.recentPurchase;
        const responseLength = response?.length || 0;
        return response && responseLength > 0 ? response[responseLength - 1].products : recentPurchasesData[0].products;
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <HomeHeader
                profilePicUrl={userData?.profilePic}
                userName={userData?.username}
                searchOnPressed={() => {
                    navigation.navigate("Search");
                }} />
            {/* Scrollable Body */}
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <HomeBanner data={data?.data.banner} />
                </View>
                {/* Categories Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Categories</Text>
                    <FlatList
                        numColumns={4}
                        data={data?.data.categories || categoriesData}
                        renderItem={renderCategoryItem}
                        keyExtractor={(item) => item._id.toString()}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.flatListContainer}
                        scrollEnabled={false}
                    />
                </View>

                {/* Products Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Featured Products</Text>
                    <FlatList
                        numColumns={2}
                        data={data?.data.products || productsData}
                        renderItem={renderProductItem}
                        keyExtractor={(item) => Math.random().toString()}
                        scrollEnabled={false} // Disable FlatList scrolling inside ScrollView
                    />
                </View>

                {/* Recent Purchases Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Recent Purchases</Text>
                    <FlatList
                        data={getRecentPurchaseData()}
                        renderItem={renderRecentPurchaseItem}
                        keyExtractor={(item) => item._id.toString()}
                        scrollEnabled={false} // Disable FlatList scrolling inside ScrollView
                    />
                </View>
            </ScrollView>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    header: {
        height: 50,
        backgroundColor: '#4682B4',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    scrollContainer: {
        paddingVertical: 10,
    },
    section: {
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    flatListContainer: {
        justifyContent: 'space-between', // Adds space between rows
    },
    categoryItem: {
        alignItems: 'center',
        marginTop: 10,
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    categoryIcon: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginBottom: 5,
    },
    categoryName: {
        fontSize: 14,
    },
    productCard: {
        flex: 1,
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 10,
        elevation: 3,
        alignItems: 'center',
        padding: 10,
    },
    productImage: {
        width: '100%',
        height: 100,
        borderRadius: 5,
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
        textAlign: 'center',
    },
    productPrice: {
        fontSize: 12,
        color: 'gray',
        marginTop: 5
    },
    recentPurchaseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    recentPurchaseIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    recentPurchaseName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    recentPurchaseDate: {
        fontSize: 12,
        color: 'gray',
    },
});
