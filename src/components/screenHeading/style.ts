import { StyleSheet } from "react-native";
import colors from "../../utils/color";
import { normalize } from "../../utils/metrics";


const styles = StyleSheet.create({
    container : {
        position : 'relative',
        backgroundColor : colors.primary,
        overflow : 'hidden',
    },

    backgroundImage : {
        width: '100%',
        height: '120%',
        position : 'absolute',
        top : 0,
        bottom : 0,
        right : 0,
        left : 0,
    },

    logo : {
        position : 'absolute',
        left: normalize(32),
        top: '60%',
    }
})

export default styles;