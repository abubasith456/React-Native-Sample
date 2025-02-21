// components/CustomHeader.tsx
import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface HeaderProps {
  title: string;
}

const CustomHeader = ({ title }: HeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      {/* StatusBar Configuration */}
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
      />

      {/* Header Container */}
      <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{title}</Text>
          {/* Add other header elements (e.g., buttons) here */}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: '#FF0000', // Zomato-like red color
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  headerContent: {
    height: 56, // Standard header height
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CustomHeader;