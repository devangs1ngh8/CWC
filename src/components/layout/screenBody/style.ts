import { StyleSheet } from "react-native";
import colors from "../../../colors";
import { normalize } from "../../../utils/metrics";

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor : colors.background,
        borderTopLeftRadius : normalize(50),
        borderTopRightRadius : normalize(50),
        paddingHorizontal : normalize(24),
        paddingTop : normalize(28),
        paddingBottom : normalize(20),
    },

    scroll : {
        flex : 1,
    },

    scrollContent : {
        paddingBottom : normalize(20),
    },

    heading : {
        alignItems : 'center',
        marginBottom : normalize(32)
    },

    description : {
        fontSize : normalize(14),
        lineHeight : normalize(20),
        color : colors.textSecondary,
        textAlign : 'center',
        marginTop : normalize(8),
        fontWeight : 500
    },

    bottomContent : {
        // marginTop : normalize(26)
    }
})

export default styles;