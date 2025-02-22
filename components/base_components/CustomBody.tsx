// components/Body.tsx
import React from 'react';
import { View, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height } = Dimensions.get("window");

interface BodyProps {
    children: React.ReactNode;
}

const CustomBody = ({ children }: BodyProps) => {
    const insets = useSafeAreaInsets();
    const headerHeight = height * 0.070;

    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.content,
                // {
                //     marginTop: headerHeight + insets.top,
                //     paddingBottom: insets.bottom
                // }
            ]}>
                {children}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white"
    },
    content: {
        flex: 1,
    },
});

export default CustomBody;