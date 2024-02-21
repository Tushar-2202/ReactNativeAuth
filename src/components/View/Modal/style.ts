import { StyleSheet } from "react-native";
import { Colors } from "../../../utils";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.MODAL_DARK,
    },
    box: {
        backgroundColor:Colors.PRIMARY,
        padding: 20,
        borderRadius: 10,
        width: '80%',
        height: 200,
        alignItems: 'center',
    }
});
    
export default styles;