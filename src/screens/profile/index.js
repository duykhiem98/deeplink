import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Button, Container, Header, Left, Right } from "native-base";
import { KeyBoardScroll, Row } from "../../components";
import Icon from "react-native-vector-icons/dist/MaterialIcons";
import styles from "./styles";
import FastImage from "react-native-fast-image";
import { Colors, Metrics } from "../../themes";
import NavigationService from "../../navigation/NavigationService";
import { _global } from "../../core/global";
import Version from "./Version";
import { Ctv } from "./Ctv";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderEmptyView = () => {
    return (
      <View style={styles.viewEmpty}>
        <Text style={[styles.txtEmpty, { marginBottom: 10 }]}>
          Bạn chưa đăng nhập
        </Text>
      </View>
    )
  }

  render() {
    const { user, orders, token } = this.props;
    console.log(`user:`, user);

    // StatusBar.setBarStyle("light-content", true);
    // if (Platform.OS === "android") {
    //   StatusBar.setBackgroundColor("#0e1130", true);
    //   StatusBar.setTranslucent(true);
    // }

    return (
      <Container style={styles.container}>
        <Header style={styles.header} transparent androidStatusBarColor={Colors.red}>
          <Left style={styles.left}>
            <Text style={styles.textTitle}>Tài khoản</Text>
          </Left>
          <Right style={styles.right}>
          </Right>
        </Header>
        {
          token ? <KeyBoardScroll>
            <View style={styles.mainView}>
              <TouchableOpacity style={styles.viewNav} activeOpacity={0.8} onPress={this.onAccount}>
                <View>
                  <FastImage
                    style={styles.avatar}
                    source={{ uri: 'https://64.media.tumblr.com/8718c162103c60f9b0dd8a9647371f9f/tumblr_inline_odlx7jjwBp1uo4xzd_640.png' }}
                    resizeMode='cover'
                  />
                  {/* <Image style={styles.avatar} source={Images.bg_live} /> */}
                </View>
                <View style={styles.viewName}>
                  {
                    user.fullName && <Text style={styles.txtContent}>{user.fullName || ``}</Text>
                  }
                  {
                    user.mobile && <Text style={[styles.txtTitle, { marginTop: 5 }]}>{user.mobile || ``}</Text>
                  }
                  {
                    user.email && <Text style={[styles.txtTitle, { marginTop: 5 }]}>{user.email || ``}</Text>
                  }

                  <Text style={[styles.txtTitle, { marginTop: 5 }]}>Hội viên vàng</Text>
                </View>
                <View style={{ justifyContent: 'flex-end', alignItems: 'center', }}>
                  <Icon name={'keyboard-arrow-right'} color={'black'} size={24} />
                </View>
              </TouchableOpacity>

              <View style={styles.separatorView} />

              <Row
                leftTitle={'Quản lý đơn hàng'}
                containerStyle={{ width: Metrics.WIDTH - 32 }}
                rightTitleStyle={{ color: Colors.red }}
                rightIcon={true}
                separator
                onPress={() => { NavigationService.navigate('orderList'); }}
              />

              {/* <Row
                    leftTitle={'Khuyến mãi của bạn'}
                    containerStyle={{ width: Metrics.WIDTH - 32 }}
                    rightTitleStyle={{ color: Colors.red }}
                    rightIcon={true}
                    separator
                    onPress={() => { }}
                  /> */}

              <Row
                leftTitle={'Giỏ hàng'}
                containerStyle={{ width: Metrics.WIDTH - 32 }}
                rightTitleStyle={{ color: Colors.red }}
                rightIcon={true}
                separator
                onPress={() => { NavigationService.navigate('cart'); }}
              />

              <View style={styles.separatorView} />

              <Row
                leftTitle={'Số points'}
                containerStyle={{ width: Metrics.WIDTH - 32 }}
                rightTitleStyle={{ color: Colors.red }}
                // rightIcon={true}
                rightTitle={`${user.point}`}
                onPress={() => { }}
                separator
              />

              <Row
                leftTitle={'Đơn hàng hoàn thành'}
                rightTitle={orders && orders.length || `0`}
                containerStyle={{ width: Metrics.WIDTH - 32 }}
                rightTitleStyle={{ color: Colors.red }}
                onPress={() => { }}
              />

              <View style={styles.separatorView} />
              <Ctv />
            </View>
          </KeyBoardScroll> : this.renderEmptyView()
        }

        <View style={styles.viewBottom}>
          <Version />
          <Button style={styles.buttonContinue} onPress={this.onLogout}>
            <Text style={styles.textButton}>{!token ? `ĐĂNG NHẬP` : `ĐĂNG XUẤT`}</Text>
          </Button>
        </View>
      </Container>
    );
  }

  onAccount = () => {
  }
  onLogout = () => {
    const { user, token } = this.props;
    if (!token) {
      NavigationService.navigate('authenStack');
      return;
    }
    _global.Alert.alert({
      title: 'Bạn chắc chắn muốn đăng xuất?',
      leftButton: { text: 'Huỷ' },
      rightButton: { text: 'Đồng ý', onPress: () => this.logout() }
    });
  }

  logout = () => {
    this.props.showLoading();
    setTimeout(() => {
      this.props.logout()
      this.props.hideLoading();
    }, 300);
  }
}

export default Profile;
