import { Platform, StyleSheet } from "react-native";
import { Fonts, Metrics, Colors } from "../../themes/";

const styles = StyleSheet.create({
  container: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    backgroundColor: Colors.greys
  },

  header: {
    backgroundColor: 'white',
    borderBottomWidth: 0,
    paddingLeft: Metrics.WIDTH * 0.03,
    paddingRight: Metrics.WIDTH * 0.03
  },

  left: {
    flex: 1,
    backgroundColor: Colors.transparent
  },

  backArrow: {
    justifyContent: "center",
    alignItems: "center"
  },

  body: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.transparent
  },

  textTitle: {
    color: Colors.black,
    fontSize: Fonts.moderateScale(15),
  },

  right: {
    flex: 1,
    backgroundColor: Colors.transparent,
    alignItems: "center",
  },

  alertBg: {
    width: Metrics.WIDTH * 0.03,
    height: Metrics.WIDTH * 0.03,
    borderRadius: Metrics.WIDTH * 0.015,
    backgroundColor: "#ff0000",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -(Metrics.WIDTH * 0.018)
  },

  alertTxt: {
    fontSize: Fonts.moderateScale(8),
    color: Colors.snow
  },

  bagIcon: {
    marginLeft: Metrics.WIDTH * 0.04,
    color: Colors.snow
  },

  heartBg: {
    width: Metrics.WIDTH * 0.054,
    height: Metrics.WIDTH * 0.054,
    borderRadius: Metrics.WIDTH * 0.027,
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Colors.snow,
    alignItems: "center",
    justifyContent: "center"
  },

  heartIcon: {
    color: Colors.snow,
    alignSelf: "center"
  },

  mainView: {
    flex: 1,
    backgroundColor: 'white'
  },

  mainRow: {
    flexDirection: "row",
    paddingTop: Metrics.HEIGHT * 0.018,
    paddingBottom: Metrics.HEIGHT * 0.025,
    paddingLeft: Metrics.WIDTH * 0.045,
    paddingRight: Metrics.WIDTH * 0.045
  },

  labelText: {
    color: "#a3a3a3",
    width: Metrics.WIDTH * 0.35,
    fontSize: Fonts.moderateScale(16),
    textAlign: "left"
  },

  infoText: {
    width: Metrics.WIDTH * 0.5,
    fontSize: Fonts.moderateScale(16),
    textAlign: "left"
  },

  dividerHorizontal: {
    height: Metrics.HEIGHT * 0.001,
    backgroundColor: "#e1e1e1",
    marginLeft: Metrics.WIDTH * 0.045,
    marginRight: Metrics.WIDTH * 0.045
  },

  changePasswordView: {
    marginTop: Metrics.HEIGHT * 0.025,
    marginLeft: Metrics.WIDTH * 0.045
  },

  editInfoMainView: {
    bottom: 0,
    position: "absolute",
    width: Metrics.WIDTH
  },

  editDivider: {
    height: Metrics.HEIGHT * 0.001,
    backgroundColor: "#e1e1e1"
  },

  editInfoView: {
    padding: Metrics.HEIGHT * 0.015,
    margin: Metrics.HEIGHT * 0.015,
    backgroundColor: "#ffc700",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },

  editInfoText: {
    color: "#0e1130",
    fontSize: Fonts.moderateScale(16),
  },

  viewBottom: {
    backgroundColor: 'white',
    paddingBottom: 10,
    paddingTop: 10
  },

  buttonContinue: {
    width: Metrics.WIDTH - 32,
    height: 44,
    backgroundColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },

  textButton: {
    color: Colors.white,
    fontSize: Fonts.moderateScale(13),
  },

  viewNav: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  viewName: {
    flex: 1,
    paddingRight: 10,
  },
  txtContent: {
    color: Colors.txtGrey,
    fontSize: 16,
  },
  txtTitle: {
    color: Colors.txtGrey,
    fontSize: 14,
    fontWeight: 'bold',
  },
  viewContent: {
    paddingVertical: 16
  },
  row: {
    paddingVertical: 0,
    paddingRight: 0
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
    marginRight: 10,
  },

  viewEmpty: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtEmpty: {
    color: Colors.black,
    fontSize: Fonts.moderateScale(15),
  },

  separatorView: {
    width: Metrics.WIDTH,
    height: 10,
    backgroundColor: Colors.greys,
    // marginTop: Metrics.WIDTH * 0.01,
    // marginBottom: Metrics.WIDTH * 0.01,
  },
});

export default styles;
