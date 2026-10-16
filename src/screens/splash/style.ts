import { StyleSheet } from "react-native";
import { normalize, vh, vw } from "../../utils/metrics";

const styles = StyleSheet.create({
container : {
    flex : 1,
}, 

background : {
    width : '100%',
    height : '100%',
},

logo : {
position : 'absolute',
top : '45%',
alignSelf : 'center',
},
})

export default styles;