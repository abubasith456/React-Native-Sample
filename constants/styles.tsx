import { DefaultTheme } from 'react-native-paper';

// Define your custom color scheme
const customColors = {
    primary: "#2da7bc",
    text: "#707070",
    grey: "#b5b5b5",
    blue: "#3c82fc",
    white: "#fff",
    light_grey: "#f8f8f8",
    dark: "#2a2c5c",
    bg: "#0f7e4a",
    yellow: "#fed922",
    light_bg: "#e0e0e2",
    light_green: "#0f7e4a",
    lighter_green: "#2ba56a",
    leave_green: "#18a561",
    purple: "#876aba",
    water: "#6f8bc8",
    green: "#1baa43",
    straw: "#e55d4b",
    red: "#e53b32",
    bluegreen: "#2CB9B0",
    black: "#000000",
    primaryColor: '#7373ff',
    primaryLightColor: '#87CEEB',
    primaryButtonColor: '#7373ff',
    primaryTextColor: 'white',
    secondaryTextColor: 'grey',
    splashBaseColor: "black"
};

export const GlobalStyle = {
    ...DefaultTheme.colors,
    primaryColor: '#7373ff',
    primaryLightColor: '#87CEEB', //Will change
    primaryButtonColor: '#7373ff',
    primaryTextColor: 'white',
    secondaryTextColor: 'grey',
    splashBaseColor: "black"
}

// Extend the default theme with your custom colors
export const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        ...customColors,
        // Map Paper's default color names to your custom colors
        primary: customColors.primaryColor,
        accent: customColors.bluegreen,
        background: customColors.white,
        surface: customColors.light_grey,
        error: customColors.red,
        text: customColors.primaryTextColor,
        onSurface: customColors.secondaryTextColor,
    },
    // Add other theme properties
    roundness: 8,
    fonts: {
        ...DefaultTheme.fonts,
        // Define custom fonts if needed
        regular: {
            fontFamily: 'Roboto-Regular',
            fontWeight: '400' as '400',
        },
        medium: {
            fontFamily: 'Roboto-Medium',
            fontWeight: '500' as '500',
        },
    },
};

// Type for theme consumption in components
export type AppTheme = typeof theme;

// Helper function remains the same
export function generateColor() {
    const randomColor = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');
    return `#${randomColor}`;
}