import { StyleSheet } from 'react-native';

import { theme } from "../../index"
const { windowWidth, fontSize, fontFamily, normalize, color } = theme;

const styles = StyleSheet.create({
    container:{
        marginBottom: 10,
        width: windowWidth
    },

    inputContainer:{
        width: windowWidth - 40,
        height: normalize(65),
        fontSize: fontSize.regular + 2,
        borderBottomColor: "#A5A7A9"
    }
});

export default styles;