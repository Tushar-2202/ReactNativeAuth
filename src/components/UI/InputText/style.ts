import { StyleSheet } from "react-native";
import { Colors } from "../../../utils";

const styles = StyleSheet.create({
    inputField: {
        marginTop: 15
    },
    label: {
        fontSize: 15,
        color: Colors.LABLE
    },
    input: {
        backgroundColor: Colors.INPUT_FIELD,
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        color: Colors.TEXT
    },
    error: {
        color: Colors.ERROR,
        fontSize: 12,
        marginTop: 5
    }
})

export default styles;