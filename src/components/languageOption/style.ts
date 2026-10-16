import { StyleSheet } from "react-native";
import { normalize } from "../../utils/metrics";
import colors from "../../utils/color";


const styles = StyleSheet.create({
    container : {
        width : '100%',
        flexDirection : 'row',
        alignItems : 'center',
        borderWidth : 1,
        borderColor : colors.border,
        borderRadius : normalize(16),
        paddingHorizontal : normalize(12),
        marginBottom : normalize(20),
        backgroundColor : colors.textTertiary,
        height : normalize(55),
    },

    selectedContainer : {
        borderColor : colors.primary,
        backgroundColor : colors.buttonBG,
    },

    radio : {
        width : normalize(20),
        height : normalize(20),
        borderRadius : normalize(11),
        borderWidth : 1,
        borderColor : '#D1D1D6',
        alignItems : 'center',
        justifyContent : 'center',
        marginRight : normalize(10)
    },

    radioDot : {
        width : normalize(10),
        height : normalize(10),
        borderRadius : normalize(6),
        backgroundColor : colors.primary
    },

    title : {
        fontSize : normalize(16),
        fontWeight : 600,
        color : colors.textPrimary
    }
})

export default styles;