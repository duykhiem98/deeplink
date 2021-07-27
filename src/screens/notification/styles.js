import { Platform, StyleSheet } from "react-native";

// Screen Styles
import { Fonts, Metrics, Colors } from "../../themes";

const styles = StyleSheet.create({
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

  body: {
    flex: 3,
    alignItems: "center",
    backgroundColor: Colors.transparent
  },

  textTitle: {
    color: Colors.black,
    fontSize: Fonts.moderateScale(15),
  },

  right: {
    flex: 1,
    alignItems: "center"
  },

  main: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    backgroundColor: Colors.snow,
    flexDirection: "column"
  },

  rowBg: {
    width: Metrics.WIDTH,
    backgroundColor: Colors.snow
  },

  rowProfileNameTime: {
    width: Metrics.WIDTH * 0.92,
    alignSelf: "center",
    flexDirection: "row",
    marginTop: Metrics.WIDTH * 0.03,
    marginBottom: Metrics.WIDTH * 0.03
  },

  imageNotification: {
    width: Metrics.WIDTH * 0.12,
    height: Metrics.WIDTH * 0.12,
    borderRadius: Metrics.WIDTH * 0.06,
    resizeMode: "contain"
  },

  rowNameTime: {
    marginLeft: Metrics.WIDTH * 0.04,
    flexDirection: "column",
    justifyContent: "center"
  },

  nameTxt: {
    color: Colors.black,
    fontSize: Fonts.moderateScale(15),
    textAlign: "left"
  },

  timeTxt: {
    color: "#959595",
    fontSize: Fonts.moderateScale(15),
    textAlign: "left"
  },

  descriptionTxt: {
    color: "#959595",
    fontSize: Fonts.moderateScale(14),
    width: Metrics.WIDTH * 0.92,
    alignSelf: "center",
    textAlign: "left"
  },

  viewEmpty: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtEmpty: {
    color: Colors.black,
    fontSize: Fonts.moderateScale(15),
  },

  divider: {
    height: 1,
    width: Metrics.WIDTH,
    backgroundColor: "#e1e1e1",
    marginTop: Metrics.WIDTH * 0.03
  }
});

export default styles;
