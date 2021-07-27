import { Platform, StyleSheet } from "react-native";
import { Fonts, Metrics, Colors } from "../../themes/";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.greys,
  },
  header: {
    backgroundColor: "white",
    paddingLeft: Metrics.WIDTH * 0.03,
    paddingRight: Metrics.WIDTH * 0.03,
  },

  left: {
    flex: 1,
    backgroundColor: Colors.transparent,
  },
  bntbackArrow: {
    width: 40,
    justifyContent: "center",
  },
  backArrow: {
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  right: {
    flex: 1,
    backgroundColor: Colors.transparent,
  },
  separatorView: {
    width: Metrics.WIDTH,
    height: 10,
    backgroundColor: Colors.greys,
    // marginTop: Metrics.WIDTH * 0.01,
    // marginBottom: Metrics.WIDTH * 0.01,
  },
  body: {
    alignItems: "center",
    backgroundColor: "white",
  },
  buttonSignIn: {
    marginTop:24,
    backgroundColor: Colors.red,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: Metrics.WIDTH * 0.9,
    height: 44,
  },
  textSigIn: {
    color: Colors.white,
    fontSize: Fonts.moderateScale(13),
    fontWeight: "bold",
  },
  infoCTV: {
    paddingTop: 10,
    backgroundColor: "white",
    alignItems: "center",
  },
  infoImage: {
    width: 88,
    height: 88,
    borderRadius: 44,
  },
  viewCamera: {
    alignItems: "center",
    height: 20,
    marginVertical: 10,
    flexDirection: "row",
  },
  camera: {
    width: 20,
    height: 20,
  },
  textCam: {
    paddingLeft: 12,
    color: Colors.txtGrey,
    fontSize: 16,
  },
  inputView: {
    height: 64,
    backgroundColor: "white",
    paddingTop: 7,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.1)",
  },
  sText: {
    fontSize: 14,
    color: "#828282",
  },
  textInput: {
    height: 24,
    backgroundColor: "transparent",

  },

  bntRegister: {
    backgroundColor: Colors.red,
    marginVertical: 24,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: Metrics.WIDTH * 0.9,
    height: 44,
  },
  viewSuccess: {
    paddingHorizontal: 16,
    height: 45,
    flexDirection: "row",
    backgroundColor: "white",
  },
  textTitle: {
    fontSize: 14,
    color: "black",
    lineHeight:20,
  },
  textTitle1: {
    fontSize: 14,
    color: "red",
  },
  right1: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: Colors.transparent,
  },
  bntCopy: {
    width:50,
    marginLeft:10,
    height:30,
    borderRadius:10,
    backgroundColor:Colors.red,
    alignItems: "center",
    justifyContent: "center"
},
  viewPercent: {
    paddingHorizontal:16,
    height: 45,
    flexDirection: "row",
    backgroundColor: "white",

  },
  botWith:{
    width: Metrics.WIDTH,
    height:1,
    borderBottomWidth: 0.1,
    backgroundColor: "#E0E0E0",
  }
});
export default styles;
