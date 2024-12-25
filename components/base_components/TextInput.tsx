import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { TextInput as PaperTextInput } from 'react-native-paper'
import { GlobalStyle } from '../../constants/styles'

export default function TextInput({ errorText, description, ...props }: any) {
    return (
        <View style={styles.container}>
            <PaperTextInput
                style={styles.input}
                selectionColor={GlobalStyle.primaryColor}
                underlineColor="transparent"
                mode="outlined"
                outlineColor={GlobalStyle.primaryColor}
                {...props}
            />
            {description && !errorText ? (
                <Text style={styles.description}>{description}</Text>
            ) : null}
            {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: 12,
    },
    input: {
        backgroundColor: GlobalStyle.surface,
    },
    description: {
        fontSize: 13,
        color: GlobalStyle.secondary,
        paddingTop: 8,
    },
    error: {
        fontSize: 13,
        color: GlobalStyle.error,
        paddingTop: 8,
    },
})