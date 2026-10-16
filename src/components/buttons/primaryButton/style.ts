import { StyleSheet } from "react-native";
import { normalize } from "../../../utils/metrics";
import colors from "../../../utils/color";


const styles = StyleSheet.create({
    button : {
        width : '90%',
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
        color : colors.textTertiary,
        fontSize : normalize(15),
        fontWeight : 600
    }
})

export default styles;