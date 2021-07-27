import React, { Component } from "react";
import { Image, Keyboard, Platform, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Container } from "native-base";
import { Colors, Images } from "../../themes";
// Screen Styles
import styles from "./styles";
import { KeyBoardScroll } from "../../components";
import { _global } from "../../core/global";
import firebase from "react-native-firebase";
import ConfirmationCodeInput from "./ConfirmationCodeInput";
import NavigationService from "../../navigation/NavigationService";

const TIMEOUT_TO_RESEND_SMS = 60;

class InputOTP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secondResend: TIMEOUT_TO_RESEND_SMS,
      confirmResult: null,
    };
  }

  showLoading = () => {
    _global.Loading && _global.Loading.show();
  }

  hideLoading = () => {
    _global.Loading && _global.Loading.hide();
  }

  sendCode = () => {
    this.onCountDownResend();
    // setTimeout(() => {
    // this.confirmInputRef && this.confirmInputRef._onFocus(0);
    // },500);

    this.showLoading();

    let { phone } = this.props;
    //FAKE
    // phone = '0985832073';
    if (phone.startsWith('0')) phone = phone.replace('0', '+84');

    firebase
      .auth()
      .signInWithPhoneNumber(phone)
      .then(confirmResult => {
        console.log(`confirmResult`, confirmResult);
        this.setState({ confirmResult });
        if (Platform.OS !== 'ios') {
          this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
            console.log(`onAuthStateChanged`, user);
            if (user && user._user.phoneNumber == phone) {
              console.log(`OK handle here`);
              this.sendOTPSuccess();
            } else {
              this.verifyPhoneNumber();
            }
          });
        }
        this.hideLoading();
      })
      .catch(error => {
        console.log(error);
        global.Dropdown.alertWithType('error', 'Thông báo', error.message);
        this.hideLoading();
      });

    console.log(`phone=>`, phone);
  }

  componentDidMount() {
     // NavigationService.navigate("inputPassword", { username: this.props.phone, isRegister: this.props.isRegister });
    console.log(`OTP componentDidMount`);
    // return ;
    this.showLoading();
    setTimeout(() => {
      this.sendCode();
    }, Platform.OS !== 'ios' ? 500 : 1000);
  }

  verifyPhoneNumber = () => {
    let { phone } = this.props;
    //FAKE
    // phone = '0985832073';
    if (phone.startsWith('0')) phone = phone.replace('0', '+84');

    this.isSendOTPSuccess = false;
    firebase
      .auth()
      .signInWithPhoneNumber(phone)
      .then(confirmResult => {
        this.hideLoading();
        console.log(`confirmResult2`, confirmResult);
        this.setState({ confirmResult });
      })
      .catch(error => {
        this.hideLoading();
        console.log(error)
      });
  }

  onConfirmPhoneNumber = (otp) => {
   // let { phone: _phone, isRegister, referralCode } = this.props;
   //  NavigationService.navigate("inputPassword", { username: _phone, isRegister, referralCode });
   //  return;
    let { phone } = this.props;
    //FAKE
    // phone = '0985832073';
    if (phone.startsWith('0')) phone = phone.replace('0', '+84');
console.log(otp)
    const { confirmResult } = this.state;
    if (confirmResult) {
      confirmResult
        .confirm(otp)
        .then(user => {
          console.log(`onFinishCheckingCode user`, user);
          this.hideLoading();
          if (user && user._user.phoneNumber == phone) this.sendOTPSuccess();

        })
        .catch(error => {
          console.log(`onFinishCheckingCode error`, error);
          this.hideLoading();
          this.confirmInputRef && this.confirmInputRef.clear();
          // showAlert(TYPE.ERROR,'Oops!!!','Mã xác nhận bạn nhập chưa chính xác.');
          global.Dropdown.alertWithType('error', 'Thông báo', error.message);
        });
    } else {
      this.hideLoading();
      global.Dropdown.alertWithType('error', 'Thông báo', `Mã xác nhận bạn nhập chưa chính xác.`);
    }
  };

  sendOTPSuccess() {

    if (!this.isSendOTPSuccess) {
      this.isSendOTPSuccess = true;
      this.props.callback && this.props.callback();
      let { phone, isRegister, referralCode } = this.props;
      NavigationService.navigate("inputPassword", { username: phone, isRegister, referralCode });
    }
  }


  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
    this.countDownTimer && clearInterval(this.countDownTimer);
    this.reset();
  }

  reset() {
    if (Platform.OS === 'android' && this.unsubscribe) this.unsubscribe();
  }

  signout = () => {
    firebase.auth().signOut();
  }

  _renderTextResend = () => {
    let message = `Gửi lại SMS trong ${this.state.secondResend}s`;

    if (this.state.secondResend === 0) {
      message = 'Gửi lại mã OTP';
    }
    const Component = this.state.secondResend !== 0 ? View : TouchableOpacity;

    return (
      <Component onPress={this.onResendPressed}>
        <Text style={styles.resendLabelStyle}>
          {message}
        </Text>
      </Component>
    );
  };

  onResendPressed = () => {
    if (this.state.secondResend !== 0) return;

    this.setState({ secondResend: TIMEOUT_TO_RESEND_SMS }, () => {
      this.onCountDownResend();
      this.verifyPhoneNumber();
    });
  };

  onContinuePressed = () => {
    this.onFinishCheckingCode(this.state.code);
  };

  onFinishCheckingCode = code => {
    this.showLoading();
    this.onConfirmPhoneNumber(code);
  };

  onFocused = () => {
    this.setState({ disabled: true });
  };

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
          </View>

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.viewContent}>
              <Text style={styles.txtMessage}>
                {`Một mã xác thực đã được gửi tới số điện thoại ${this.props.phone}. Vui lòng nhập mã OTP để xác thực.`}
              </Text>

              <ConfirmationCodeInput
                ref={ref => {
                  this.confirmInputRef = ref;
                }}
                keyboardType="numeric"
                codeLength={6}
                className="border-circle"
                autoFocus={false}
                selectionColor={Colors.red}
                codeInputStyle={{
                  fontWeight: '800',
                  borderColor: Colors.red,
                  borderWidth: 1,
                  marginTop: 20,
                  color: Colors.red,
                }}
                onFulfill={code => this.onFinishCheckingCode(code)}
              />
              {this._renderTextResend()}
            </View>
          </TouchableWithoutFeedback>

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

  onCountDownResend = () => {
    this.countDownTimer = setInterval(() => {
      this.setState({ secondResend: this.state.secondResend - 1 }, () => {
        if (this.state.secondResend === 0) {
          if (this.countDownTimer) clearInterval(this.countDownTimer);
        }
      });
      if (this.state.secondResend === 0) {
        this.hideLoading();
      }
    }, 1000);
  };

}

export default InputOTP;
