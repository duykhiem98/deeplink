import { Platform, StyleSheet } from "react-native";
import { Fonts, Metrics, Colors } from "../../themes";

const styles = StyleSheet.create({
  imgContainer: {
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT
  },
  mainGradiyantView: {
    flex: 1,
    shadowColor: "#89c68d",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
    borderColor: "#89ca90"
  },
  header: {
    backgroundColor: Colors.transparent,
    height: Metrics.WIDTH * 0.15,
    borderBottomWidth: 0,
    ...Platform.select({
      ios: {},
      android: {
        marginTop: Fonts.moderateScale(25)
      }
    }),
    elevation: 0
  },
  left: {
    flex: 0.5,
    backgroundColor: "transparent"
  },
  backArrow: {
    justifyContent: "center",
    alignItems: "center",
    width: 30
  },
  logosec: {
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT * 0.3,
    marginTop: Metrics.WIDTH * 0.2,
    justifyContent: "center",
    alignItems: "center",
  },
  logostyle: {
    flex: 1,
    width: '100%'
  },
  iconApple: {
    width: 54,
    height: 54,
    marginRight: 30,
  },
  iconFacebook: {
    width: 54,
    height: 54,
  },
  body: {
    flex: 3,
    alignItems: "center",
    backgroundColor: "transparent"
  },
  textTitle: {
    color: '#1d262a',
    fontSize: Fonts.moderateScale(26),
    marginTop: 15,
    alignSelf: "center",
  },
  right: {
    flex: 0.5
  },
  inputFieldSec: {
    width: Metrics.WIDTH,
    alignItems: "center",
    marginBottom: 40,
    marginTop: 30,
  },
  textInput: {
    backgroundColor: 'transparent',
    marginTop: 20
  },
  chboxConatiner: {
    flexDirection: "row",
    width: Metrics.WIDTH * 0.9,
    marginTop: 12,
  },
  textRememberMe: {
    color: '#1d262a',
    fontSize: Fonts.moderateScale(13),
    marginLeft: Fonts.moderateScale(10),
    fontWeight: 'bold'
  },
  textForgotPwd: {
    color: '#1d262a',
    fontSize: Fonts.moderateScale(13),
    textAlign: "right",
  },
  signInSec: {
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT * 0.1,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 16,
    paddingRight: 16,
  },
  buttonSignIn: {
    backgroundColor: Colors.red,
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: "center",
    alignSelf: "center",
    width: Metrics.WIDTH * 0.9,
    height: 44,
    marginTop: 24,
  },
  textSigIn: {
    color: Colors.white,
    fontSize: Fonts.moderateScale(13),
    fontWeight: 'bold'
  },
  textWhite: {
    color: '#1d262a',
    fontSize: Fonts.moderateScale(13),
  },
  createAccount: {
    position: 'absolute',
    // width: Metrics.WIDTH,
    // height: Metrics.HEIGHT * 0.3,
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end"
  },
  textSignUp: {
    color: "#1d262a",
    fontSize: Fonts.moderateScale(13),
    fontWeight: 'bold'
  },
  viewError: {
    marginTop: 2,
    alignSelf: "center",
    width: Metrics.WIDTH * 0.9,
  },
  txtError: {
    color: 'red',
    fontSize: 12
  },
  viewVia: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  viewSocial: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  viewLine: {
    flex: 1,
    height: 0.5,
    backgroundColor: Colors.gray,
  },
  textVia: {
    color: Colors.gray,
    fontSize: Fonts.moderateScale(13),
  },

  container: {
    flex: 1
  },
  viewContent: {
    flex: 1,
    alignItems: 'center',
  },
  txtMessage: {
    color: '#000',
    textAlign: 'center',
    width: '80%',
    alignSelf: 'center',
    fontSize: 18,
    marginTop: 50,
  },
  btn: {
    borderRadius: 20,
    marginTop: 50,
    marginBottom: 25,
  },
  resendLabelStyle: {
    color: '#000',
    fontSize: 14,
    alignSelf: 'center',
    marginTop: 50,
  },
});
export default styles;
