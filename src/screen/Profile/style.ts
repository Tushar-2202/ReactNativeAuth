import { StyleSheet } from 'react-native';
import { Colors } from '../../utils';
import { height, width } from '../../utils/Constant';

const styles = StyleSheet.create({
    form: {
        marginHorizontal: 20,
        marginTop: height * 0.07
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: Colors.HEADER,
        marginBottom: 10
    },
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
    button: {
        backgroundColor: Colors.SECONDARY,
        padding: 15,
        borderRadius: 5,
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: Colors.PRIMARY,
        fontSize: 18,
        fontWeight: 'bold'
    },
    profileImageContainer: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileCenter: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        height: height * 0.18,
        width: height * 0.18,
    },
    profileImage: {
        height: '100%',
        width: '100%',
        borderRadius: 100
    },
    cameraIcon: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        backgroundColor: Colors.DARK,
        padding: 7,
        borderRadius: 50,
        elevation: 10
    }
});

export default styles;