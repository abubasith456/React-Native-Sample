// components/CustomHeader.tsx
import React from 'react';
import { View, StyleSheet, StatusBar, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GlobalStyle } from '../../constants/styles';

const { height } = Dimensions.get("window");

interface HeaderProps {
  children: React.ReactNode;
}

const CustomHeader = ({ children }: HeaderProps) => {
  const insets = useSafeAreaInsets();

  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent={true}
      />
      <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
        <View style={styles.headerContent}>
          {children}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: GlobalStyle.primaryColor,
    position: 'relative',
    width: "100%",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30
  },
  headerContent: {
    height: height * 0.11,
    justifyContent: 'center',
  },
});

export default CustomHeader;