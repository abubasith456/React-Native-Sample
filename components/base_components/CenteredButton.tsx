import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { GlobalStyle } from '../../constants/styles';

const CenteredButton = ({ onPress, title, style }: any) => {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.button, style]}>
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 50,
        backgroundColor: GlobalStyle.primaryButtonColor,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'center'
    },
});

export default CenteredButton;
