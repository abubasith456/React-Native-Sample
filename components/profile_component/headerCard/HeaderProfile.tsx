import { StyleSheet, View, Image, Text, Dimensions } from "react-native"
const { height } = Dimensions.get("window");

export const HeaderProfile = ({ profilePicUrl, usernameTitle, userSubTitile }: any) => {
    const isprofilePicUrlAvailable = !!profilePicUrl;
    return (
        <View style={styles.profileContainer}>
            <View style={styles.profilePicContainer}>
                {
                    isprofilePicUrlAvailable ? <Image
                        source={{ uri: profilePicUrl }} // Replace with your image URL
                        style={styles.profilePicContainer}
                    /> : <Image
                        source={require('../../../assets/favicon.png')}
                        style={{
                            height: height * 0.06,
                            width: height * 0.06,
                            alignSelf: 'center'
                        }}
                    />
                }
            </View>
            <View style={styles.profileDetailsContainer}>
                <View style={styles.profileInfoContainer}>
                    <Text style={styles.userNameText} >{usernameTitle}</Text>
                    <Text style={styles.userPositionText} >{userSubTitile}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    profileContainer: {
        marginHorizontal: 15,
        marginTop: height * 0.01,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 5,
    },
    profilePicContainer: {
        height: height * 0.09,
        width: height * 0.09,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000', // Add a subtle shadow for effect
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    profileDetailsContainer: {
        height: 80,
        marginStart: 20,
        justifyContent: 'center',
    },
    profileIcon: {
        alignSelf: 'center'
    },
    profileInfoContainer: {

    },
    userNameText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    userPositionText: {
        fontSize: 16,
        color: 'white'
    }
});