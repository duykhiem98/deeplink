import React, { Component } from "react";
import {
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {
  Container,
  Button,
  Header,
} from "native-base";
import _ from 'lodash';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";
import { Fonts, Metrics, Colors } from "../../themes";
import { Input, KeyBoardScroll, Row } from "../../components";
import LineInput from "../../components/Input/LineInput";
import { formatCurency, isNullOrEmpty } from "../../common/utils";
import { _global } from "../../core/global";
import ActionSheet from "../../components/ActionSheet";

class ShippingAddress extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shippingAddress: props.shippingAddress || {
        addressDefault: true,
        addressLine1: "",
        addressLine2: "",
        cityCode: "",
        cityName: "",
        districtCode: "",
        districtName: "",
        mobile: "",
        wardCode: "",
        wardName: "",
        fullName: ""
      }
    };
  }

  render() {
    // const { cities, districts, wards } = this.props;
    const { shippingAddress } = this.state;
    // StatusBar.setBarStyle("light-content", true);
    // if (Platform.OS === "android") {
    //   StatusBar.setBackgroundColor("#0e1130", true);
    //   StatusBar.setTranslucent(true);
    // }
    console.log(`shippingAddress:`, shippingAddress);
    // let findCity = cities && cities.find(e => { return e.code === shippingAddress.cityCode });
    // let cityName = findCity && findCity.name_with_type;
    // let findDistrict = districts && districts.find(e => { return e.code === shippingAddress.districtCode });
    // let districtName = findDistrict && findDistrict.name_with_type;
    // let findWard = wards && wards.find(e => { return e.code === shippingAddress.wardCode });
    // let wardName = findWard && findWard.name_with_type;

    return (
      <Container style={{ backgroundColor: Colors.greys }}>
        <Header style={styles.header} transparent androidStatusBarColor={Colors.red}>
          <View style={styles.left}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() => this.props.navigation.pop()}
            >
              <MaterialIcons name="keyboard-backspace" size={24} color={Colors.black} />
              <Text style={styles.textTitle}>?????a ch??? nh???n h??ng</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.right}>
            {/* <TouchableOpacity
              style={styles.heartBg}
              onPress={() => this.setState({ isSearch: !this.state.isSearch })}
            >
              <Ionicons name="search-outline" size={24} color="white" />
            </TouchableOpacity> */}
          </View>
        </Header>

        <View style={{ flex: 1 }}>
          <KeyBoardScroll>

            <View style={styles.viewInfo}>
              <View style={styles.viewAddress}>
                <MaterialIcons name={'person'} size={18} color={'black'} />
                <Text style={[styles.textAddress, { marginLeft: 5 }]}>T??n ng?????i nh???n</Text>
              </View>
              <LineInput
                placeholder={'T??n ng?????i nh???n'}
                value={shippingAddress.fullName ? shippingAddress.fullName : ``}
                // maxLength={100}
                onChangeText={this.changeName}
              />

              <View style={[styles.viewAddress, { marginTop: 16 }]}>
                <MaterialIcons name={'call'} size={18} color={'black'} />
                <Text style={[styles.textAddress, { marginLeft: 5 }]}>S??? ??i???n tho???i</Text>
              </View>
              <LineInput
                placeholder={'S??? ??i???n tho???i'}
                value={shippingAddress.mobile ? shippingAddress.mobile : ``}
                // maxLength={100}
                onChangeText={this.changePhone}
              />

              <View style={[styles.viewAddress, { marginTop: 16, marginBottom: 10 }]}>
                <MaterialIcons name={'location-on'} size={18} color={'black'} />
                <Text style={[styles.textAddress, { marginLeft: 5 }]}>?????a ch??? nh???n h??ng</Text>
              </View>

              <Row
                leftTitle={'T???nh/Th??nh ph???'}
                rightTitle={shippingAddress.cityName ? shippingAddress.cityName : ``}
                rightTitleBold
                rightTitleStyle={{ marginRight: 5, color: Colors.red }}
                rightIcon={true}
                rightIconName='keyboard-arrow-down'
                separator
                onPress={this.onChooseCity}
                rightStyle={{ flex: 0 }}
                containerStyle={{ paddingHorizontal: 16 }}
                separatorStyle={{ marginHorizontal: 16 }}
              />

              <Row
                leftTitle={'Qu???n/Huy???n'}
                rightTitle={shippingAddress.districtName ? shippingAddress.districtName : ``}
                rightTitleBold
                rightTitleStyle={{ marginRight: 5, color: Colors.red }}
                rightIcon={true}
                rightIconName='keyboard-arrow-down'
                separator
                onPress={this.onChooseDistrict}
                rightStyle={{ flex: 0 }}
                containerStyle={{ paddingHorizontal: 16 }}
                separatorStyle={{ marginHorizontal: 16 }}
              />

              <Row
                leftTitle={'Ph?????ng/X??'}
                rightTitle={shippingAddress.wardName ? shippingAddress.wardName : ``}
                rightTitleBold
                rightTitleStyle={{ marginRight: 5, color: Colors.red }}
                rightIcon={true}
                rightIconName='keyboard-arrow-down'
                separator
                onPress={this.onChooseWard}
                rightStyle={{ flex: 0 }}
                containerStyle={{ paddingHorizontal: 16 }}
                separatorStyle={{ marginHorizontal: 16 }}
              />

              <LineInput
                placeholder={'?????a ch???'}
                value={shippingAddress.addressLine1 ? shippingAddress.addressLine1 : ``}
                // maxLength={100}
                onChangeText={this.changeAddressLine}
                inputStyle={{ paddingHorizontal: 16 }}
              />
            </View>
          </KeyBoardScroll>

          <View style={styles.viewBottom}>
            <Button style={styles.buttonContinue} onPress={this.saveAddress}>
              <Text style={styles.textButton}>L??U</Text>
            </Button>
          </View>
        </View>

        <ActionSheet
          ref={o => this.actionSheetCity = o}
          options={this.getOptionCity()}
          bottomTitle='Hu???'
        />
        <ActionSheet
          ref={o => this.actionSheetDistrict = o}
          options={this.getOptionDistrict()}
          bottomTitle='Hu???'
        />
        <ActionSheet
          ref={o => this.actionSheetWard = o}
          options={this.getOptionWard()}
          bottomTitle='Hu???'
        />
      </Container>
    );
  }

  getOptionCity = () => {
    const { cities } = this.props;
    return cities.map(r => ({ title: `${r.name_with_type}`, onPress: () => this.selectCity(r.code, r.name_with_type) }))
  }
  getOptionDistrict = () => {
    const { districts } = this.props;
    return districts.map(r => ({ title: `${r.name_with_type}`, onPress: () => this.selectDistrict(r.code, r.name_with_type) }))
  }
  getOptionWard = () => {
    const { wards } = this.props;
    return wards.map(r => ({ title: `${r.name_with_type}`, onPress: () => this.selectWard(r.code, r.name_with_type) }))
  }

  onChooseCity = () => {
    const { cities } = this.props;
    // if (cities && cities.length > 0) {
    //   this.actionSheetCity.show();
    //   return;
    // }
    this.props.getCity({
      callback: () => {
        setTimeout(() => {
          this.actionSheetCity.show();
        }, 100);
      }
    });
  }
  onChooseDistrict = () => {
    const { districts } = this.props;
    // if (districts && districts.length > 0) {
    //   this.actionSheetDistrict.show();
    //   return;
    // }
    let { shippingAddress } = this.state;
    this.props.getDistrict({
      cityCode: shippingAddress.cityCode,
      callback: () => {
        setTimeout(() => {
          this.actionSheetDistrict.show();
        }, 100);
      }
    });
  }
  onChooseWard = () => {
    const { wards } = this.props;
    // if (wards && wards.length > 0) {
    //   this.actionSheetWard.show();
    //   return;
    // }
    let { shippingAddress } = this.state;
    this.props.getWard({
      districtCode: shippingAddress.districtCode,
      callback: () => {
        setTimeout(() => {
          this.actionSheetWard.show();
        }, 100);
      }
    });
  }

  selectCity = (cityCode, cityName) => {
    // LayoutAnimation.configureNext(CustomLayoutLinear);
    this.setState({
      shippingAddress: {
        ...this.state.shippingAddress,
        cityCode,
        cityName,
        districtCode: '',
        districtName: '',
        wardCode: '',
        wardName: ''
      }
    });
  }
  selectDistrict = (districtCode, districtName) => {
    // LayoutAnimation.configureNext(CustomLayoutLinear);
    this.setState({
      shippingAddress: {
        ...this.state.shippingAddress,
        districtCode,
        districtName,
        wardCode: '',
        wardName: ''
      }
    });
  }
  selectWard = (wardCode, wardName) => {
    // LayoutAnimation.configureNext(CustomLayoutLinear);
    this.setState({
      shippingAddress: {
        ...this.state.shippingAddress,
        wardCode,
        wardName
      }
    });
  }

  changeName = (fullName) => {
    this.setState({
      shippingAddress: {
        ...this.state.shippingAddress,
        fullName
      }
    });
  }
  changePhone = (mobile) => {
    this.setState({
      shippingAddress: {
        ...this.state.shippingAddress,
        mobile
      }
    });
  }
  changeAddressLine = (addressLine1) => {
    this.setState({
      shippingAddress: {
        ...this.state.shippingAddress,
        addressLine1
      }
    });
  }

  saveAddress = () => {
    let { shippingAddress } = this.state;
    if (isNullOrEmpty(shippingAddress.fullName)) {
      _global.Alert.alert({
        title: 'Th??ng b??o',
        message: 'B???n ch??a nh???p t??n ng?????i nh???n',
        leftButton: { text: 'OK' }
      });
      return;
    }
    if (isNullOrEmpty(shippingAddress.mobile)) {
      _global.Alert.alert({
        title: 'Th??ng b??o',
        message: 'B???n ch??a nh???p s??? ??i???n tho???i',
        leftButton: { text: 'OK' }
      });
      return;
    }
    if (isNullOrEmpty(shippingAddress.cityCode)) {
      _global.Alert.alert({
        title: 'Th??ng b??o',
        message: 'B???n ch??a ch???n t???nh/th??nh ph???',
        leftButton: { text: 'OK' }
      });
      return;
    }
    if (isNullOrEmpty(shippingAddress.districtCode)) {
      _global.Alert.alert({
        title: 'Th??ng b??o',
        message: 'B???n ch??a ch???n qu???n/huy???n',
        leftButton: { text: 'OK' }
      });
      return;
    }
    if (isNullOrEmpty(shippingAddress.wardCode)) {
      _global.Alert.alert({
        title: 'Th??ng b??o',
        message: 'B???n ch??a ch???n ph?????ng/x??',
        leftButton: { text: 'OK' }
      });
      return;
    }
    if (isNullOrEmpty(shippingAddress.addressLine1)) {
      _global.Alert.alert({
        title: 'Th??ng b??o',
        message: 'B???n ch??a nh???p ?????a ch??? chi ti???t',
        leftButton: { text: 'OK' }
      });
      return;
    }

    delete shippingAddress.id;
    this.props.addMyShippingAddress({
      shippingAddress, callback: () => {
        this.props.getMyShippingAddress();
        this.props.navigation.pop();
      }
    });
  }
}

export default ShippingAddress;