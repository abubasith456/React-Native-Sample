import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    FlatList,
    Image,
    TouchableOpacity,
    StatusBar,
} from "react-native"
import { RootState, useAppDispatch, useAppSelector } from "../core/state_management/store";
import { useEffect } from "react";
import { fetchHome, fetchProfile } from "../core/api/UserRepo";
import { HomeHeader } from "../components/home_components/HomeHeader";
import { HomeBanner } from "../components/home_components/HomeBanner";
import { categoriesData, productsData, recentPurchasesData } from "../constants/ApiSampleResponse";
import LoadingModal from "../components/base_components/LodingModal";
import { getUserData } from "../core/local_storage/LocalStorage";
import { SafeAreaView } from "react-native-safe-area-context";
import { GlobalStyle } from "../constants/styles";
import ShimmerHeader from "../components/shimmering/home_shimmering/Header_shimmering";
import ShimmerBanner from "../components/shimmering/home_shimmering/BannerShimmer";
import ShimmerCategories from "../components/shimmering/home_shimmering/CategoryShimmer";
import ShimmerProducts from "../components/shimmering/home_shimmering/ProductShimmer";
import ShimmerRecentPurchases from "../components/shimmering/home_shimmering/SimilarShimmer";
import CustomBody from "../components/base_components/CustomBody";


export const HomeScreen = ({ navigation, route }: any) => {
    console.log("navigation data =>", navigation)
    console.log("route data =>", route)
    const dispatch = useAppDispatch();
    const { profileData } = useAppSelector((state: RootState) => state.profileApi);
    const { loading, data, error, errorMessage } = useAppSelector((state: RootState) => state.homeApi);
    const userData = data?.data.user;
    const featureProducts = data?.data.products ?? [];
    let userId = "11"

    console.log(" data ===> " + data?.data);

    useEffect(() => {
        if (!!data) {
            if (!!data.data) {
                ///Success
            }
        } else {
            if (error) {
                console.log(errorMessage)
            }
        }
        if (!data) {  // 🚀 Only call API if data is empty
            handleRetrieve();
        }
    }, []);

    //TODO: will change this to route navigation data
    const handleRetrieve = async () => {
        const retrievedData = await getUserData();
        const userId = retrievedData?.user_id
        dispatch(fetchHome({ userId }))
        dispatch(fetchProfile({ userId: userId }));

    }

    const renderCategoryItem = ({ item }: any) => (
        <TouchableOpacity style={styles.categoryItem} onPress={() => {
            navigation.navigate("Products", { productName: item.link });
        }}>
            <Image
                resizeMode="contain"
                source={{ uri: item.image }}
                style={styles.categoryIcon} />
            <Text style={styles.categoryName}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderProductItem = ({ item }: any) => (
        <TouchableOpacity style={styles.productCard} onPress={() => {
            navigation.navigate('ProductDetails', { product: item, productName: "hijabs" });
        }}>
            <Image source={{ uri: item.productImage ?? item.images[0] }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>Rs.{item.price}</Text>
        </TouchableOpacity>
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
    console.log("SPECIAL LOG: ==> ", loading)
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={GlobalStyle.primaryColor} />
            {/* Header */}
            {loading ? (
                <ShimmerHeader />
            ) : (
                <HomeHeader
                    profilePicUrl={profileData?.profilePic}
                    userName={profileData?.username}
                    searchOnPressed={() => {
                        navigation.navigate("Search");
                    }} />
            )}
            {/* Scrollable Body */}
            <CustomBody>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {/* Banner */}
                    {loading ? (
                        <ShimmerBanner />
                    ) : (
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <HomeBanner data={data?.data.banner} />
                        </View>
                    )}
                    {/* Categories Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Categories</Text>
                        {loading ? (
                            <ShimmerCategories />
                        ) : (
                            <FlatList
                                numColumns={4}
                                data={data?.data.categories || categoriesData}
                                renderItem={renderCategoryItem}
                                keyExtractor={(item) => item._id.toString()}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.flatListContainer}
                                scrollEnabled={false}
                            />
                        )}
                    </View>
                    {/* Products Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Featured Products</Text>
                        {loading ? (
                            <ShimmerProducts />
                        ) : (
                            <FlatList
                                numColumns={2}
                                data={featureProducts || productsData}
                                renderItem={renderProductItem}
                                keyExtractor={(item) => Math.random().toString()}
                                scrollEnabled={false}
                            />
                        )}
                    </View>
                    {/* Recent Purchases Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Recent Purchases</Text>
                        {loading ? (
                            <ShimmerRecentPurchases />
                        ) : (
                            <FlatList
                                data={getRecentPurchaseData()}
                                renderItem={renderRecentPurchaseItem}
                                keyExtractor={(item) => item._id.toString()}
                                scrollEnabled={false}
                            />
                        )}
                    </View>
                </ScrollView>
            </CustomBody>

        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        justifyContent: 'center',
        alignItems: 'center',
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
        justifyContent: 'space-between', // Space between items in a row
        paddingHorizontal: 5,           // Small padding for the container
        flexGrow: 1,                    // Ensure the container grows to fit its content
    },
    categoryItem: {
        flex: 1,                        // Ensure items take equal space
        alignItems: 'center',           // Center items horizontally
        justifyContent: 'center',       // Center items vertically
        marginVertical: 10,             // Add vertical spacing between rows
        marginHorizontal: 5,            // Small margin for spacing
    },
    categoryIcon: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginBottom: 5,
    },
    categoryName: {
        fontSize: 14,
        textAlign: 'center',            // Center-align text
    },
    productCard: {
        flex: 1,
        margin: 5,
        backgroundColor: 'white',
        borderRadius: 30,
        elevation: 3,
        alignItems: 'center',
        paddingTop: 5,
        paddingBottom: 10
    },
    productImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
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
