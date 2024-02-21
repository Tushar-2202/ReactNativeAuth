import { StyleSheet } from 'react-native';
import { Colors } from '../../utils';
import { height,width } from '../../utils/Constant';

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
    rememberForgotContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15
    },
    rememberMe: {
        flexDirection: 'row',
        gap: 5
    },
    rememberLabel: {
        fontSize: 15,
        color: Colors.DARK
    },
    forgotPassword: {

    },
    forgotLabel: {
        fontSize: 15,
        color: Colors.DARK,
        fontWeight: '500'
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
    alredyAccountContainer: {
        flexDirection: 'row',
        marginTop: 10
    },
    alreadyAccount: {
        fontSize: 15,
        color: Colors.TEXT
    },
    alredySignupText: {
        fontSize: 15,
        color: Colors.DARK,
        fontWeight: 'bold',
        marginLeft: 5
    },
    orContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 50,
        gap: 10
    },
    line: {
        height: 1,
        flex: 1,
        backgroundColor: Colors.INPUT_FIELD
    },
    or: {
        color: Colors.DARK,
        fontWeight: '500'
    },
    socialLoginContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 50
    },
    socialButton: {
        backgroundColor: Colors.INPUT_FIELD,
        padding: 15,
        borderRadius: 5,
        width: width * 0.25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    socialIcon: {
        width: 25,
        height: 25
    },
    footer: {
        marginTop: 30,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    footerText: {
        color: Colors.HEADER,
        fontSize: 16
    },
});

export default styles;