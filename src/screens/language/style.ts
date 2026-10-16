import { StyleSheet } from "react-native";
import colors from "../../utils/color";
import { normalize } from "../../utils/metrics";

const styles = StyleSheet.create({
    container : {
        flex : 1,
        backgroundColor : colors.primary
    },

     options : {
        marginTop : normalize(4)
     },

     note : {
        color : colors.primary,
        fontSize : normalize(12),
        marginTop : normalize(2),
        fontWeight : 500
     },

     headingRow : {
      flexDirection : 'row',
      alignItems : 'center',
      justifyContent : 'center',
      flexWrap : 'wrap'
     },

     headingTitle : {
      fontSize : normalize(20),
      fontWeight : 'bold',
      fontFamily : 'Manrope'

     },

     headingAccent : {
      fontSize : normalize(20),
      fontWeight : 'bold',
      marginLeft : normalize(5),
      color : colors.primary,
      fontFamily : 'Manrope'
     },

     infoRow : {
      flexDirection : 'row',
      gap : normalize(6),
     },

     infoImage : {
      width : normalize(16),
      height : normalize(16),
      marginTop : normalize(2)
     }
})

export default styles;