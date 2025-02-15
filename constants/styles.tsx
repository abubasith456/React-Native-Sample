import { DefaultTheme } from 'react-native-paper'

export const GlobalStyle = {
    ...DefaultTheme.colors,
    primaryColor: '#7373ff',
    primaryLightColor: '#87CEEB', //Will change
    primaryButtonColor: '#00BFFF',
    primaryTextColor: 'white',
    secondaryTextColor: 'grey',
    splashBaseColor: "black"
}

export default {
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
    // light_green: "#18945a",
    lighter_green: "#2ba56a",
    leave_green: "#18a561",
    purple: "#876aba",
    water: "#6f8bc8",
    green: "#1baa43",
    straw: "#e55d4b",
    red: "#e53b32",
    // blue: "#1A91DA",
    bluegreen: "#2CB9B0",
    black: "#000000",
};

export function generateColor() {
    const randomColor = Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');
    return `#${randomColor}`;
};