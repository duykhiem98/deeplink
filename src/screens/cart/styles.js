import { Platform, StyleSheet, Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");
import { Fonts, Metrics, Colors } from "../../themes/";

const styles = StyleSheet.create({
  mainview: {
    marginLeft: Metrics.HEIGHT * 0.045,
    marginTop: Metrics.HEIGHT * 0.15,
    marginBottom: Metrics.HEIGHT * 0.15,
  },

  headertxt: {
    fontSize: 32,
    textAlign: "center",
    color: "white",
  },

  listrow: {
    backgroundColor: "transparent",
    flexDirection: "row",
    marginBottom: Metrics.HEIGHT * 0.04,
  },

  rowtxt: {
    color: "white",
    fontSize: 20,
    backgroundColor: "transparent",
    marginLeft: Metrics.HEIGHT * 0.025,
    textAlign: "center",
  },

  rowCountText: {
    color: "white",
    fontSize: 17,
    backgroundColor: "transparent",
    textAlign: "center",
    paddingLeft: Metrics.HEIGHT * 0.015,
    paddingRight: Metrics.HEIGHT * 0.015,
  },

  rowCountBg: {
    backgroundColor: "#d9b63e",
    borderRadius: 20,
    marginLeft: Metrics.HEIGHT * 0.025,
    justifyContent: "center",
    alignItems: "center",
    height: Metrics.HEIGHT * 0.045,
  },

  headerMenu: {
    borderBottomWidth: 0,
    elevation: 0,
  },

  header: {
    backgroundColor: Colors.white,
    elevation: 0,
    paddingLeft: Metrics.WIDTH * 0.03,
    paddingRight: Metrics.WIDTH * 0.03,
  },

  textTitle: {
    color: Colors.black,
    fontSize: Fonts.moderateScale(16),
    marginLeft: Metrics.WIDTH * 0.02
  },
  textButton: {
    color: Colors.white,
    fontSize: Fonts.moderateScale(13),
  },

  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: "center",
  },

  body: {
    alignItems: "center",
  },

  right: {
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: Fonts.moderateScale(16),
  },

  iconColor: {
    color: "#fff",
  },

  forgotPassword: {
    color: "#0691ce",
    fontSize: Fonts.moderateScale(17),
    height: Metrics.HEIGHT * 0.05,
    width: Metrics.WIDTH,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "transparent",
    top: Metrics.HEIGHT * 0.44,
  },

  menuListItem: {
    marginLeft: Metrics.WIDTH * 0.03,
    color: "#fff",
    fontSize: Fonts.moderateScale(20),
  },

  menuIcon: {
    width: Metrics.WIDTH * 0.06,
    height: Metrics.WIDTH * 0.06,
    resizeMode: "contain",
  },

  imgContainer: {
    height: Metrics.HEIGHT,
    resizeMode: "cover",
  },

  listProfileContainer: {
    height: Metrics.HEIGHT * 0.9,
    backgroundColor: "transparent",
  },

  profileDataBg: {
    flexDirection: "row",
    marginTop: Metrics.HEIGHT * 0.07,
    alignItems: "center",
    marginLeft: Metrics.WIDTH * 0.08,
    width: Metrics.WIDTH * 0.45,
    alignSelf: "center",
    marginLeft: -(Metrics.WIDTH * 0.02),
    justifyContent: "center",
  },

  profileImg: {
    width: Metrics.WIDTH * 0.15,
    height: Metrics.WIDTH * 0.15,
    borderRadius: Metrics.WIDTH * 0.075,
  },

  circles: {
    borderRadius: Metrics.WIDTH * 0.08,
    borderColor: "#fff",
    borderWidth: 2,
  },

  nameTxt: {
    textAlign: "center",
    color: "white",
    fontSize: Fonts.moderateScale(15),
    marginLeft: -(Metrics.WIDTH * 0.03),
    marginTop: Metrics.WIDTH * 0.05,
  },

  addressTxt: {
    textAlign: "center",
    color: "#a6a7ab",
    fontSize: Fonts.moderateScale(13),
    marginLeft: -(Metrics.WIDTH * 0.03),
  },

  bottomViewBg: {
    flexDirection: "row",
    height: Metrics.HEIGHT * 0.1,
    backgroundColor: "#0691ce",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: Metrics.WIDTH * 0.02,
    paddingRight: Metrics.WIDTH * 0.02,
  },

  bottomImageDataBg: {
    flexDirection: "row",
    alignItems: "center",
  },

  bottomImage: {
    width: Metrics.WIDTH * 0.12,
    height: Metrics.WIDTH * 0.12,
    borderRadius: Metrics.WIDTH * 0.06,
    borderWidth: 1,
    borderColor: "#fff",
  },

  bottomNameTxt: {
    color: "#919191",
    fontSize: Fonts.moderateScale(13),
  },

  profileBg: {
    height: Metrics.HEIGHT * 0.28,
    alignItems: "center",
  },

  settingIcon: {
    width: Metrics.WIDTH * 0.05,
    height: Metrics.WIDTH * 0.05,
    resizeMode: "contain",
    marginLeft: Metrics.WIDTH * 0.06,
  },

  bellIcon: {
    color: "#595b6a",
    marginRight: Metrics.WIDTH * 0.06,
  },

  cartCountBg: {
    marginTop: -(Metrics.HEIGHT * 0.04),
    marginLeft: -(Metrics.WIDTH * 0.03),
    width: Metrics.WIDTH * 0.04,
    height: Metrics.WIDTH * 0.04,
    borderRadius: Metrics.WIDTH * 0.02,
    backgroundColor: "#ff0000",
    alignItems: "center",
    justifyContent: "center",
  },

  cartItemCount: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(10),
  },

  bottomTxt: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(22),
  },

  bottomPriceTxt: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(20),
  },

  menuListSec: {
    height: Metrics.HEIGHT * 0.62,
  },

  container: {
    backgroundColor: "#11142a",
    justifyContent: "center",
    alignItems: "center",
  },

  menuStyleSec: {
    backgroundColor: "transparent",
  },

  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  titleCollapse: {
    flexDirection: "row",
  },

  headerTitleMenu: {
    flexDirection: "row",
    alignItems: "center",
  },

  HeaderExpandMenu: {
    paddingTop: Metrics.WIDTH * 0.03,
    paddingBottom: Metrics.WIDTH * 0.03,
    color: Colors.snow,
    fontSize: Fonts.moderateScale(20),
    textAlign: "center",
  },

  mybodyText: {
    paddingTop: 5,
    paddingBottom: 5,
    color: "#adafc1",
    fontSize: Fonts.moderateScale(15),
    textAlign: "center",
    paddingLeft: Metrics.WIDTH * 0.04,
  },

  submenutitleSec: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "transparent",
    justifyContent: "space-between",
  },

  subTitleTxt: {
    fontSize: Fonts.moderateScale(15),
    width: Metrics.WIDTH * 0.71,
    color: "#adafc1",
    textAlign: "center",
    paddingLeft: Metrics.WIDTH * 0.02,
  },

  titleTxt: {
    width: Metrics.WIDTH * 0.71,
    fontSize: Fonts.moderateScale(18),
    color: "white",
    textAlign: "center",
  },

  subTitleBg: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: Metrics.WIDTH * 0.04,
    marginRight: 10,
  },

  nextArrow: {
    paddingRight: Metrics.WIDTH * 0.07,
    marginRight: Metrics.WIDTH * 0.07,
  },

  searchViewBg: {
    backgroundColor: "#e9e9e9",
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT * 0.08,
    justifyContent: "center",
    alignItems: "center",
  },

  searchView: {
    backgroundColor: Colors.snow,
    borderRadius: 5,
    width: Metrics.WIDTH * 0.95,
    height: Metrics.HEIGHT * 0.06,
    alignItems: "center",
    flexDirection: "row",
  },

  searchText: {
    color: "#8e8e93",
    fontSize: Fonts.moderateScale(15),
    marginLeft: Metrics.WIDTH * 0.03,
  },

  listContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    backgroundColor: "#fff",
    paddingVertical: Fonts.moderateScale(1),
  },

  coverImageStyle: {
    width: Metrics.WIDTH * 0.5,
    height: Metrics.HEIGHT * 0.3425,
    borderWidth: Fonts.moderateScale(1),
    borderColor: "#fff",
    alignItems: "center",
  },

  categoryBtn: {
    height: Metrics.HEIGHT * 0.04,
    paddingHorizontal: Metrics.WIDTH * 0.025,
    bottom: Metrics.HEIGHT * 0.015,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: Fonts.moderateScale(13),
    textAlign: "center",
  },

  viewNewProduct: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.transparent,
  },

  slidesec: {
    height: Metrics.HEIGHT * 0.4,
    backgroundColor: Colors.transparent,
  },

  dot: {
    backgroundColor: "#d4d4d4",
    width: Metrics.WIDTH * 0.02,
    height: Metrics.WIDTH * 0.02,
    borderRadius: Metrics.WIDTH * 0.01,
    marginLeft: Metrics.WIDTH * 0.005,
    marginRight: Metrics.WIDTH * 0.005,
  },

  activeDot: {
    backgroundColor: "#0691ce",
    width: Metrics.WIDTH * 0.02,
    height: Metrics.WIDTH * 0.02,
    borderRadius: Metrics.WIDTH * 0.01,
    marginLeft: Metrics.WIDTH * 0.005,
    marginRight: Metrics.WIDTH * 0.005,
  },

  slide: {
    flex: 1,
    backgroundColor: Colors.transparent,
    marginTop: Metrics.WIDTH * 0.01,
  },

  sliderImage: {
    resizeMode: "cover",
    flex: 1,
    width: Metrics.WIDTH,
    backgroundColor: "grey",
  },

  contentStyle: {
    position: "absolute",
    alignSelf: "center",
    alignItems: "center",
    top: Metrics.HEIGHT * 0.055,
  },

  headertext: {
    backgroundColor: Colors.transparent,
    fontSize: Fonts.moderateScale(16),
    textAlign: "center",
    alignSelf: "center",
    color: "#0e1130",
  },

  desctext: {
    backgroundColor: Colors.transparent,
    fontSize: Fonts.moderateScale(23),
    textAlign: "center",
    alignSelf: "center",
    color: "#8d1b1b",
    lineHeight: Fonts.moderateScale(23),
  },

  newArrivalSec: {
    flexDirection: "row",
    paddingTop: Metrics.HEIGHT * 0.01,
    paddingLeft: Metrics.HEIGHT * 0.01,
    backgroundColor: "#fff",
  },
  newArrivalBody: {
  },
  sideButtons: {
    flex: 1,
  },

  titelText: {
    fontSize: Fonts.moderateScale(14),
    color: "#362f2d",
    fontWeight: 'bold'
  },

  rowMain: {
    backgroundColor: Colors.snow,
    width: Metrics.WIDTH * 0.445,
    alignItems: "flex-start",
    alignContent: "flex-start",
    margin: Metrics.WIDTH * 0.0165,
  },

  itemImage: {
    width: Metrics.WIDTH * 0.445,
    height: Metrics.WIDTH * 0.64,
  },

  itemTitle: {
    width: Metrics.WIDTH * 0.445,
    color: "#0e1130",
    fontSize: Fonts.moderateScale(15),
    textAlign: "left",
  },

  itemPrice: {
    width: Metrics.WIDTH * 0.445,
    color: "#ff0000",
    fontSize: Fonts.moderateScale(15),
    marginTop: Metrics.HEIGHT * 0.01,
    marginBottom: Metrics.HEIGHT * 0.01,
    textAlign: "left",
    marginLeft: 5,
  },

  swiperView: {
    height: Metrics.HEIGHT * 0.525,
  },

  newArrivalView: {
    flexDirection: "row",
    padding: Metrics.HEIGHT * 0.01,
  },

  searchInput: {
    color: "#6d6d71",
    fontSize: Fonts.moderateScale(15),
  },

  backArrow: {
    flexDirection: 'row',
    alignItems: "center",
  },
  actionTopView: {
    width: 36,
    height: 36,
    borderRadius: 25,
    backgroundColor: Colors.greys,
    justifyContent: "center",
    alignItems: "center",
  },

  heartIcon: {
    color: Colors.snow,
    alignSelf: "center"
  },

  viewEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtEmpty: {
    color: Colors.black,
    fontSize: Fonts.moderateScale(15),
  },

  viewPrice: {
    paddingBottom: Metrics.HEIGHT * 0.01,
    paddingLeft: Metrics.HEIGHT * 0.01,
    backgroundColor: "#fff",
  },

  iconView: {
    width: Metrics.WIDTH * 0.35,
    marginTop: 10,
    flexDirection: "row"
  },

  itemTitle: {
    width: Metrics.WIDTH * 0.35,
    color: "#0e1130",
    fontSize: Fonts.moderateScale(15),
    marginTop: 5,
    textAlign: "left"
  },

  itemPrice: {
    color: "#ff0000",
    fontSize: Fonts.moderateScale(12),
  },

  priceView: {
    width: Metrics.WIDTH * 0.35,
    marginTop: 5,
    flexDirection: "row",
    // justifyContent: 'space-between'
  },

  oldItemPrice: {
    color: "#bbbbbb",
    fontSize: Fonts.moderateScale(15),
    marginLeft: 5,
    textDecorationLine: "line-through",
    textDecorationStyle: "solid"
  },

  saleOfferView: {
    width: Metrics.WIDTH * 0.1,
    height: Metrics.WIDTH * 0.1,
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "#ffc700",
    borderRadius: Metrics.WIDTH * 0.05,
    justifyContent: "center"
  },

  saleText: {
    color: "#0e1130",
    fontSize: Fonts.moderateScale(10),
    alignSelf: "center",
    textAlign: "center"
  },

  saleOfferView: {
    width: Metrics.WIDTH * 0.1,
    height: Metrics.WIDTH * 0.1,
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "#ffc700",
    borderRadius: Metrics.WIDTH * 0.05,
    justifyContent: "center"
  },

  saleText: {
    color: "#0e1130",
    fontSize: Fonts.moderateScale(10),
    alignSelf: "center",
    textAlign: "center"
  },

  itemAvatar: {
    width: Metrics.WIDTH * 0.12,
    height: Metrics.WIDTH * 0.12,
    borderRadius: Metrics.WIDTH * 0.06
  },

  itemSeller: {
    color: "#0e1130",
    fontSize: Fonts.moderateScale(13),
    textAlign: "left"
  },

  itemTitle: {
    color: "#ff0000",
    fontSize: Fonts.moderateScale(13),
  },

  viewLive: {
  },

  viewLiveTitle: {
    flexDirection: 'row',
    padding: Metrics.HEIGHT * 0.01,
  },
  viewLiveTitleLeft: {
    flex: 1
  },
  viewLiveTitleRight: {
  },
  icon: {
    color: Colors.greys,
  },
  liveTitle: {
    color: "#0e1130",
    fontSize: Fonts.moderateScale(13),
    textAlign: "left"
  },
  liveCount: {
    color: "#ff0000",
    fontSize: Fonts.moderateScale(13),
  },

  itemLive: {
    width: '100%',
    height: Metrics.HEIGHT * 0.2,
  },

  viewSeller: {
    flexDirection: 'row',
    marginTop: Metrics.HEIGHT * 0.01,
    marginBottom: Metrics.HEIGHT * 0.01,
    paddingLeft: Metrics.HEIGHT * 0.01,
    paddingRight: Metrics.HEIGHT * 0.01,
  },

  viewSellerLeft: {
  },

  viewSellerRight: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: Metrics.WIDTH * 0.02,
    paddingRight: Metrics.WIDTH * 0.02,
  },

  separatorView: {
    width: Metrics.WIDTH,
    height: 1,
    backgroundColor: Colors.greys,
    // marginTop: Metrics.WIDTH * 0.01,
    // marginBottom: Metrics.WIDTH * 0.01,
  },

  viewApply: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 16
  },

  viewContinue: {
    // position: 'absolute',
    // bottom: 0,
    // left: 0,
    // right: 0,
    backgroundColor: 'white',
    padding: 16
  },

  textPaymentInfo: {
    color: Colors.black,
    fontSize: Fonts.moderateScale(14),
    fontWeight: 'bold'
  },

  button: {
    width: Metrics.WIDTH * 0.3,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center'
  },

  viewBottom: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 16
  },

  buttonContinue: {
    flex: 1,
    height: 44,
    marginLeft: 40,
    backgroundColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 22
  }

});

export default styles;
