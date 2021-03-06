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
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CheckBox from "react-native-check-box";
import { Images } from "../../themes";
// Screen Styles
import styles from "./styles";
import { Input, KeyBoardScroll } from "../../components";
import PasswordInput from "../../components/Input/PasswordInput";
import { _global } from "../../core/global";

class InputPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: props.username,
      referralCode: props.referralCode,
      password: '',
      rePassword: '',
      errorUsername: false,
      errorPassword: false,
      errorRePassword: false,
      isChecked: true
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
    const { username, password, rePassword, errorUsername, errorPassword, errorRePassword } = this.state;
    const { isRegister } = this.props;
    // StatusBar.setBarStyle("light-content", true);
    // if (Platform.OS === "android") {
    //   StatusBar.setBackgroundColor("transparent", true);
    //   StatusBar.setTranslucent(true);
    // }

    // const imageUri =
    //   "https://antiqueruby.aliansoftware.net/Images/signin/homescreenssix.png";

    return (
      <Container>
        <KeyBoardScroll>
          <View style={styles.logosec}>
            <Image source={Images.bg_login} style={styles.logostyle} />
          </View>
          <View style={styles.inputFieldSec}>
            <Input
              containerStyle={styles.textInput}
              placeholder="S??? ??i???n tho???i"
              value={username}
              onChangeText={this.onChangeUsername}
              error={errorUsername}
              disable={true}
            />
            {
              errorUsername && <View style={styles.viewError}><Text style={styles.txtError}>Vui l??ng nh???p t??n ????ng nh???p</Text></View>
            }

            <PasswordInput
              placeholder={'M???t kh???u'}
              value={password}
              onChangeText={this.onChangePassword}
              containerStyle={styles.textInput}
              secureTextEntry
              error={errorPassword}
            />
            {
              errorPassword && <View style={styles.viewError}><Text style={styles.txtError}>Vui l??ng nh???p m???t kh???u</Text></View>
            }

            <PasswordInput
              placeholder={'Nh???p l???i m???t kh???u'}
              value={rePassword}
              onChangeText={this.onChangeRePassword}
              containerStyle={styles.textInput}
              returnKeyType='done'
              secureTextEntry
              error={errorRePassword}
            />
            {
              errorRePassword && <View style={styles.viewError}><Text style={styles.txtError}>Vui l??ng nh???p l???i m???t kh???u</Text></View>
            }

            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.buttonSignIn}
              onPress={this.register}
            >
              <Text style={styles.textSigIn}>{isRegister ? `????NG K??` : `L??U`}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.createAccount}>
            <Text style={styles.textWhite}>B???n ???? c?? t??i kho???n? </Text>
            <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate("login")}>
              <Text style={styles.textSignUp}>????ng nh???p</Text>
            </TouchableOpacity>
          </View>
        </KeyBoardScroll>
      </Container>
    );
  }

  onChangeUsername = (username) => {
    this.setState({ username, errorUsername: !username });
  }
  onChangePassword = (password) => {
    this.setState({ password, errorPassword: !password });
  }
  onChangeRePassword = (rePassword) => {
    this.setState({ rePassword, errorRePassword: !rePassword });
  }
  checkForm = () => {
    const { username, password, rePassword } = this.state;

    if (!username || username.trim().length === 0) {
      this.setState({ errorUsername: true });
      return false;
    }
    if (!password || password.trim().length === 0) {
      this.setState({ errorPassword: true });
      return false;
    }
    if (!rePassword || rePassword.trim().length === 0) {
      this.setState({ errorRePassword: true });
      return false;
    }
    if (password !== rePassword) {
      _global.Alert.alert({
        title: 'Th??ng b??o',
        message: 'M???t kh???u nh???p l???i ch??a ch??nh x??c',
        leftButton: { text: 'OK' }
      });
      return false;
    }
    return true;
  }
  register = () => {
    if (!this.checkForm()) return;
    const { username, password, referralCode } = this.state;
    const { isRegister } = this.props;
    if (isRegister)
      this.props.register({ mobile: username, password, referralCode });
    else
      this.props.resetPassword({ mobile: username, newPassword: password });
  }
}

export default InputPassword;
