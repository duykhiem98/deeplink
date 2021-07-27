import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Platform,
  StatusBar,
  BackHandler,
  I18nManager
} from "react-native";
import { Container, Right, Header, Left, Body } from "native-base";
import { Images } from "../../themes/";
// Screen Styles
import styles from "./styles";
import { Input, KeyBoardScroll } from "../../components";
import PasswordInput from "../../components/Input/PasswordInput";
import { LoginManager, AccessToken } from 'react-native-fbsdk';
import { _global } from "../../core/global";
import { appleAuth } from '@invertase/react-native-apple-authentication';
import NavigationService from "../../navigation/NavigationService";
import { requestTrackingPermission, getTrackingStatus } from 'react-native-tracking-transparency';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // username: '0974622702',//dev
      // password: '123456aA@',//dev
      username: '',//staging
      password: '',//staging
      errorUsername: false,
      errorPassword: false,
      isChecked: true
    };
  }

  componentDidMount() {
    // onCredentialRevoked returns a function that will remove the event listener. useEffect will call this function when the component unmounts
    if (appleAuth.isSupported) {
      appleAuth.onCredentialRevoked(async () => {
        console.log('If this function executes, User Credentials have been Revoked');
      });
    }

    this.onTrackingPermission();
  }

  render() {
    const { username, password, errorUsername, errorPassword } = this.state;

    // StatusBar.setBarStyle("light-content", true);
    // if (Platform.OS === "android") {
    //   StatusBar.setBackgroundColor("transparent", true);
    //   StatusBar.setTranslucent(true);
    // }
    return (
      <Container>
        <KeyBoardScroll>
          <View style={styles.logosec}>
            <Image source={Images.bg_login} style={styles.logostyle} />
            <TouchableOpacity activeOpacity={0.7} style={styles.skipLogin} onPress={this.onSkipLogin}>
              <Text style={styles.textSkipLogin}>Bỏ qua</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputFieldSec}>
            <Input
              containerStyle={styles.textInput}
              placeholder="Sô điện thoại"
              value={username}
              returnKeyType='next'
              onChangeText={this.onChangeUsername}
              error={errorUsername}
            />
            {
              errorUsername && <View style={styles.viewError}><Text style={styles.txtError}>Vui lòng nhập số điện thoại</Text></View>
            }

            <PasswordInput
              placeholder={'Mật khẩu'}
              value={password}
              onChangeText={this.onChangePassword}
              containerStyle={styles.textInput}
              returnKeyType='done'
              secureTextEntry
              error={errorPassword}
            />
            {
              errorPassword && <View style={styles.viewError}><Text style={styles.txtError}>Vui lòng nhập mật khẩu</Text></View>
            }

            <View style={styles.chboxConatiner}>
              <Right>
                <TouchableOpacity activeOpacity={0.7} onPress={() => this.onRegister(false)}>
                  <Text style={styles.textForgotPwd}>Quên mật khẩu?</Text>
                </TouchableOpacity>
              </Right>
            </View>

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.buttonSignIn}
              onPress={this.login}
            >
              <Text style={styles.textSigIn}>ĐĂNG NHẬP</Text>
            </TouchableOpacity>

            {/* <AppleButton
              buttonStyle={AppleButton.Style.BLACK}
              buttonType={AppleButton.Type.SIGN_IN}
              style={{
                backgroundColor: 'red',
                width: 160, // You must specify a width
                height: 45, // You must specify a height
              }}
              onPress={() => this.onAppleButtonPress()}
            /> */}
          </View>

          <View style={styles.signInSec}>
            <View style={styles.viewVia}>
              <View style={[styles.viewLine, { marginRight: 16 }]} />
              <Text style={styles.textVia}>hoặc đăng nhập bằng</Text>
              <View style={[styles.viewLine, { marginLeft: 16 }]} />
            </View>
            <View style={styles.viewSocial}>
              {
                Platform.OS === 'ios' && appleAuth.isSupported && <TouchableOpacity onPress={() => this.onAppleButtonPress()}>
                  <Image source={Images.icon_apple} style={styles.iconApple} />
                </TouchableOpacity>
              }

              <TouchableOpacity onPress={this.loginFacebook}>
                <Image source={Images.icon_facebook} style={styles.iconFacebook} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.createAccount}>
            <Text style={styles.textWhite}>Bạn chưa có tài khoản? </Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => this.onRegister(true)}>
              <Text style={styles.textSignUp}>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        </KeyBoardScroll>
      </Container>
    );
  }

  onSkipLogin = () => {
    NavigationService.reset('homeStack');
  }

  onChangeUsername = (username) => {
    this.setState({ username, errorUsername: !username });
  }
  onChangePassword = (password) => {
    this.setState({ password, errorPassword: !password });
  }
  checkForm = () => {
    const { username, password } = this.state;

    if (!username || username.trim().length === 0) {
      this.setState({ errorUsername: true });
      return false;
    }
    if (!password || password.trim().length === 0) {
      this.setState({ errorPassword: true });
      return false;
    }
    return true;
  }
  login = () => {
    // this.props.navigation.navigate("homeStack");

    if (!this.checkForm()) return;
    const { username, password } = this.state;
    this.props.login({ userName: username, password });
  }
  loginFacebook = async () => {
    // const trackingStatus = await getTrackingStatus();
    // console.log(`trackingStatus:`, trackingStatus);
    // if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {
    //   // enable tracking features
    // }

    // const trackingPermission = await requestTrackingPermission();
    // console.log(`trackingPermission:`, trackingPermission);
    // if (trackingPermission === 'authorized' || trackingPermission === 'unavailable') {

    // } else {
    //   _global.Alert.alert({
    //     title: 'Thông báo',
    //     message: 'Bạn đã không cấp quyền tiếp cận người dùng.',
    //     leftButton: { text: 'OK' }
    //   });
    // }

    // enable tracking features
    LoginManager.logInWithPermissions(['email', 'public_profile']).then(result => {
      console.log(`result:`, result);
      if (result.isCancelled) {
        _global.Alert.alert({
          title: 'Thông báo',
          message: 'Bạn đã huỷ phiên đăng nhập',
          leftButton: { text: 'OK' }
        });
      } else {
        AccessToken.getCurrentAccessToken().then((data) => {
          console.log(data)
          if (data.accessToken) {
            // dispatch(loginActions.fetchLoginWithAPI(data.accessToken, Constants.API_Facebook))
            this.props.loginSocial({
              socialType: "FACEBOOK",
              token: data.accessToken
            });
          } else {
            _global.Alert.alert({
              title: 'Thông báo',
              message: 'Chưa lấy được accessToken',
              leftButton: { text: 'OK' }
            });
          }
        }
        );
      }
    }, error => {
      _global.Alert.alert({
        title: 'Thông báo',
        message: error,
        leftButton: { text: 'OK' }
      });
    }
    );
  }

  onTrackingPermission = async () => {
    // const trackingStatus = await getTrackingStatus();
    // console.log(`trackingStatus:`, trackingStatus);
    // if (trackingStatus === 'authorized' || trackingStatus === 'unavailable') {
    //   // enable tracking features
    // }

    const trackingPermission = await requestTrackingPermission();
    console.log(`trackingPermission:`, trackingPermission);
    if (trackingPermission === 'authorized' || trackingPermission === 'unavailable') {
      // enable tracking features
    }

  }

  onRegister = (isRegister) => {
    this.props.navigation.navigate("register", { isRegister });
    // FAKE
    // this.props.navigation.navigate("inputPassword", { username: '0985832072' });
  }

  onAppleButtonPress = async () => {
    // performs login request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
    });
    console.log(`appleAuthRequestResponse:`, appleAuthRequestResponse);

    const {
      user,
      email,
      nonce,
      identityToken,
      authorizationCode,
      realUserStatus /* etc */,
    } = appleAuthRequestResponse;

    // get current authentication state for user
    // /!\ This method must be tested on a real device. On the iOS simulator it always throws an error.
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
    console.log(`credentialState:`, credentialState);
    // use credentialState response to ensure the user is authenticated
    if (credentialState === appleAuth.State.AUTHORIZED) {
      // user is authenticated
      this.props.loginSocial({
        socialType: "APPLE",
        token: authorizationCode
      });
    } else {
      _global.Alert.alert({
        title: 'Thông báo',
        message: 'Chưa lấy được authorizationCode',
        leftButton: { text: 'OK' }
      });
    }
  }
}

export default Login;