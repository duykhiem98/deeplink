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
import CheckBox from "react-native-check-box";
import { Images } from "../../themes";
// Screen Styles
import styles from "./styles";
import { Input, KeyBoardScroll } from "../../components";
import PasswordInput from "../../components/Input/PasswordInput";

class InputPhoneNumber extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      errorUsername: false,
      errorPassword: false,
      isChecked: true,
      referralCode: ''
    };
  }

  componentWillMount() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function () {
      that.props.navigation.navigate("Home");
      return true;
    });
  }

  render() {
    const { username, referralCode, errorUsername, errorPassword } = this.state;

    // StatusBar.setBarStyle("light-content", true);
    // if (Platform.OS === "android") {
    //   StatusBar.setBackgroundColor("transparent", true);
    //   StatusBar.setTranslucent(true);
    // }

    const imageUri =
      "https://antiqueruby.aliansoftware.net/Images/signin/homescreenssix.png";

    return (
      <Container>
        <KeyBoardScroll>
          <View style={styles.logosec}>
            <Image source={Images.bg_login} style={styles.logostyle} />
          </View>
          <View style={styles.inputFieldSec}>
            <Input
              containerStyle={styles.textInput}
              placeholder="Số điện thoại"
              value={username}
              onChangeText={this.onChangeUsername}
              returnKeyType='done'
              keyboardType='phone-pad'
              error={errorUsername}
            />
            {
              errorUsername && <View style={styles.viewError}><Text style={styles.txtError}>Vui lòng nhập số điện thoại</Text></View>
            }

            <Input
              containerStyle={styles.textInput}
              placeholder="Nhập mã giới thiệu"
              value={referralCode}
              onChangeText={text => {
                  this.setState({referralCode: text})
              }}
              returnKeyType='done'
              // error={errorUsername}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.buttonSignIn}
              onPress={this.getOTP}
            >
              <Text style={styles.textSigIn}>TIẾP TỤC</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.createAccount}>
            <Text style={styles.textWhite}>Bạn đã có tài khoản? </Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate("login")}>
              <Text style={styles.textSignUp}>Đăng nhập</Text>
            </TouchableOpacity>
          </View>
        </KeyBoardScroll>
      </Container>
    );
  }

  onChangeUsername = (username) => {
    this.setState({ username, errorUsername: !username });
  }
  checkForm = () => {
    const { username } = this.state;

    if (!username || username.trim().length === 0) {
      this.setState({ errorUsername: true });
      return false;
    }
    return true;
  }
   getOTP = () => {
    if (!this.checkForm()) return;
    const { username, referralCode } = this.state;
    const { isRegister } = this.props;
    this.props.navigation.navigate("inputOTP", { phone: username, isRegister, referralCode });
  }
}

export default InputPhoneNumber;
