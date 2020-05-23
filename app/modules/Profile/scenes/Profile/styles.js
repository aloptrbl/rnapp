import { StyleSheet } from 'react-native';
import { theme } from "../../index"
const { padding, color, fontSize,  windowWidth, normalize } = theme;

const resizeMode = 'contain';

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'white'
    },

    title: {
fontSize: fontSize.medium,
    },
    contain: {
justifyContent:'center',
padding: 15
    },

    image:{
        height: 150,
        width: 150,
        marginBottom: padding,
        resizeMode,
        alignSelf:'center'
    },
  
    bottomContainer:{
        backgroundColor:"white",
        paddingVertical: padding * 3,
        shadowColor: "#000000",
        shadowOpacity: 0.8,
        shadowRadius: 2,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    buttonContainer:{
        paddingHorizontal:15,
        flexDirection: "row",
        alignItems:"center",
    },
});

export default styles;