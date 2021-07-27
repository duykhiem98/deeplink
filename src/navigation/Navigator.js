import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import AntDesign from "react-native-vector-icons/AntDesign";
import { Fonts, Metrics, Colors } from "../themes/";

/* Screens START */
import LoadInitial from "../containers/load-initial";
import Login from "../containers/login";
import Register from "../containers/register";
import InputOTP from "../containers/register/InputOTP";
import InputPassword from "../containers/register/InputPassword";
import Home from "../containers/home";
import BannerDetail from "../containers/banner-detail";
import Product from "../containers/product";
import Category from "../containers/product/category";
import ChildCategory from "../containers/product/child-category";
import Notification from "../containers/notification";
import Profile from "../containers/profile";
import ProductDetail from "../containers/product-detail";
import Live from "../containers/live";
import Cart from "../containers/cart";
import Order from "../containers/order";
import OrderList from "../containers/order-list";
import OrderDetail from "../containers/order-detail";
import ShippingAddress from "../containers/shipping-address";
import { getSlideFromRightTransitionConfig } from "../common/slideFromRightTransition";
import { isAndroid } from "../core/utils";
import { collaboratorScreen, GioithieuCTV, GioiThieuCTVScreen } from "../screens/collaboratorScreen";
import { RegisterCollaboretor, RegisterCTV } from "../screens/collaboratorScreen/RegisterCTV";
import { successCTV } from "../screens/collaboratorScreen/SuccessCTV";
import { CollaboratorScreen } from "../screens/collaboratorScreen/CollaboratorScreen";
/* Screens END */

const extra = {
  defaultNavigationOptions: {
    gestureResponseDistance: {
      horizontal: 300,
    },
    ...TransitionPresets.SlideFromRightIOS
  },
  headerMode: 'none',
  mode: 'card',
  cardShadowEnabled: false,
  cardOverlayEnabled: true,
  transitionConfig: isAndroid
    ? undefined
    : () => ({
      containerStyle: {
        backgroundColor: '#fff',
        shadowOpacity: 0,
        shadowOffset: { height: 0 },
        shadowRadius: 0,
        elevation: 0,
      },
    }),
};

const HomeStack = createBottomTabNavigator(
  {
    home: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <AntDesign name="home" size={22} color={tintColor} />
            <Text style={[styles.textTitle, { color: tintColor }]}>Home</Text>
          </View>
        ),
        header: null,
        tabBarVisible: true,
      }
    },
    product: {
      screen: Product,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <AntDesign name="appstore-o" size={22} color={tintColor} />
            <Text style={[styles.textTitle, { color: tintColor }]}>Sản phẩm</Text>
          </View>
        ),
        header: null,
        tabBarVisible: true,
      }
    },
    orderList: {
      screen: OrderList,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <AntDesign name="filetext1" size={22} color={tintColor} />
            <Text style={[styles.textTitle, { color: tintColor }]}>Đơn hàng</Text>
          </View>
        ),
        header: null,
        tabBarVisible: true,
      }
    },
    notification: {
      screen: Notification,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <AntDesign name="bells" size={22} color={tintColor} />
            <Text style={[styles.textTitle, { color: tintColor }]}>Thông báo</Text>
          </View>
        ),
        header: null,
        tabBarVisible: true,
      }
    },
    profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <View style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <AntDesign name="user" size={22} color={tintColor} />
            <Text style={[styles.textTitle, { color: tintColor }]}>Tài khoản</Text>
          </View>
        ),
        header: null,
        tabBarVisible: true,
      }
    }
  },
  {
    initialRouteName: 'home',
    // lazy: false,
    // animationEnabled: false,
    tabBarOptions: {
      activeTintColor: "#EB5757",
      inactiveTintColor: "#263238",
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: "white",
        paddingVertical: 5
      },
      tabStyle: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      },
      labelStyle: {
        marginLeft: 0
      }
    }
  }
);

// const DrawerStack = createDrawerNavigator(
//   {
//     Home: { screen: Home },
//     RoadTrip: { screen: RoadTrip },
//     NotificationsDetails: { screen: NotificationsDetails },
//     HistoryDetails: { screen: HistoryDetails },
//   },
//   {
//     gestureEnabled: false,
//     contentComponent: SideMenu
//   }
// );

const LoadInitialStack = createStackNavigator(
  {
    loadInitial: { screen: LoadInitial },
  },
  {
    headerMode: "none",
    navigationOptions: {
      gestureEnabled: false
    },
  }
);

// authen stack
const AuthenStack = createStackNavigator(
  {
    login: { screen: Login },
    register: { screen: Register },
    inputOTP: { screen: InputOTP },
    inputPassword: { screen: InputPassword },
  },
  {
    headerMode: "none",
    navigationOptions: {
      gestureEnabled: false
    },
    ...extra,
  }
);

// root stack
const RootStack = createStackNavigator(
  {
    loadInitialStack: { screen: LoadInitialStack },
    authenStack: { screen: AuthenStack },
    homeStack: { screen: HomeStack },
    category: { screen: Category },
    childCategory: { screen: ChildCategory },
    live: { screen: Live },
    cart: { screen: Cart },
    productDetail: { screen: ProductDetail },
    order: { screen: Order },
    orderDetail: { screen: OrderDetail },
    shippingAddress: { screen: ShippingAddress },
    bannerDetail: { screen: BannerDetail },
    GioiThieuCTVScreen:{screen:GioiThieuCTVScreen},
    RegisterCTV:{screen:RegisterCTV},
    successCTV:{screen:successCTV},
    collaboratorScreen:{screen: CollaboratorScreen}

  },
  {
    headerMode: "none",
    initialRouteName: "loadInitialStack",
    gestureEnabled: false,
    ...extra,
  }
);

const styles = StyleSheet.create({
  textTitle: {
    color: Colors.black,
    fontSize: Fonts.moderateScale(11),
    alignSelf: "center",
  },
});

export default createAppContainer(RootStack);
