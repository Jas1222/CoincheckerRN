import { Alert } from 'react-native';

export const alertInvalidInput = () => {
    Alert.alert(
        "Invalid Inpit",
        "Please enter a number or a number with a decimal",
        [
            { text: 'Ok', onPress: () => {} }
        ]
    )
}

export const isValidInput = (input) => {
    return input.match(/^\d*\.?\d*$/)
}