import { StyleSheet } from "react-native";
import { Colors } from "../../utils";
import { width,height } from "../../utils/Constant";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    lottie: {
        width: width * 0.5,
        height: height * 0.5,
    }
})

export default styles;