import { StyleSheet } from "react-native";
import { normalize } from "../../../utils/metrics";
import colors from "../../../colors";


const styles = StyleSheet.create({
    button : {
        width : '80%',
        height : normalize(55),
        borderRadius : normalize(14),
        backgroundColor : colors.primary,
        alignSelf : 'center',
        alignItems : 'center',
        justifyContent : 'center'
    },

    pressed : {
        opacity : 0.85
    },

    title : {
        color : colors.surface,
        fontSize : normalize(15),
        fontWeight : 600
    }
})

export default styles;