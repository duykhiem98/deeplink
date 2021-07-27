import React, { useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { IC_CAMERA } from "../../icon";
import NavigationService from "../../navigation/NavigationService";
import { HeaderBack } from "../../components/Headerback";
import { launchImageLibrary } from "react-native-image-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSelector } from "react-redux";
import { requestRegisterCTV } from "./api";
import DatePicker from "react-native-datepicker";
import moment from "moment";
import { log } from "react-native-reanimated";


export const RegisterCTV = ({navigation}) => {
  const [avatarImage, setAvatarImage] = React.useState("https://itcafe.vn/wp-content/uploads/2021/01/anh-gai-xinh-4.jpg");
  const [birthDay, setBirthDay] = useState("");
  const [params, setParams] = useState({
    address: "",
    bankName: "",
    bankNumber: "",
    bankOwnerName: "",
    birthDay: "",
    fullName: "",
    mobile: "",
    refCode:"",
  });
  const token = useSelector(state => state.config.token);
  const onRegister = async () => {
    const registerData = await requestRegisterCTV(params, token);
    console.log('register data ', registerData)

    if (registerData) {
      NavigationService.navigate("successCTV",{registerData: registerData});
    }
  };
  const onPicker = () => {
    launchImageLibrary({
      quality: 0.7,
      mediaType: "photo",
    }, e => {
      if (e?.assets?.length) {
        setAvatarImage(e.assets[0].uri);
      }
    });
  };

  return (

      <View style={styles.container}>
          <HeaderBack title={"Đăng ký CTV"} />
          <View style={styles.separatorView} />
        <KeyboardAwareScrollView>
        <ScrollView>
          <View style={styles.body}>
            <TouchableOpacity style={styles.infoCTV} onPress={onPicker}>
              <Image
                source={{ uri: avatarImage }}
                style={styles.infoImage}
              />
              <View style={styles.viewCamera}>
                <Image source={IC_CAMERA} style={styles.camera} />
                <Text style={styles.textCam}>Thay đổi ảnh</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.header}>
            <View style={styles.inputView}>
              <Text style={styles.sText}>Họ và Tên <Text style={{ color: "red" }}>*</Text></Text>
              <TextInput
                containerStyle={styles.textInput}
                placeholder="Nhập họ và tên"
                value={params.fullName}
                onChangeText={text => setParams({
                  ...params,
                  fullName: text,
                })}
                returnKeyType="done"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.sText}>Số điện thoại <Text style={{ color: "red" }}>*</Text></Text>
              <TextInput
                containerStyle={styles.textInput}
                placeholder="Số điện thoại"
                value={params.mobile}
                onChangeText={text => setParams({
                  ...params,
                  mobile: text,
                })}
                returnKeyType="done"
                keyboardType="phone-pad"
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.sText}>Ngày sinh <Text style={{ color: "red" }}>*</Text></Text>
              <DatePicker
                date={birthDay}
                mode="date"
                placeholder='Select Date'
                format="M/D/YYYY"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                onDateChange={value => {
                  setBirthDay(value);
                  setParams({
                    ...params,
                    birthDay:moment(value).unix(),
                  })
                }}
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0,
                  },
                  dateInput: {
                    borderWidth:0,
                    marginLeft:28

                  },
                }}
              />
            </View>
          </View>

          <View style={styles.separatorView} />
          <View style={styles.header}>
            <View style={styles.inputView}>
              <Text style={styles.sText}>Số tài khoản <Text style={{ color: "red" }}>*</Text></Text>
              <TextInput
                containerStyle={styles.textInput}
                placeholder="Nhập số tài khoản "
                value={params.bankNumber}
                onChangeText={text => setParams({
                  ...params,
                  bankNumber: text,
                })}
                returnKeyType="done"
                keyboardType="email-address"
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.sText}>Tên chủ tài khoản<Text style={{ color: "red" }}>*</Text></Text>
              <TextInput
                containerStyle={styles.textInput}
                placeholder="Nhập tên chủ tài khoản *"
                value={params.bankOwnerName}
                onChangeText={text => setParams({
                  ...params,
                  bankOwnerName: text,
                })}
                returnKeyType="done"
              />
            </View>
            <View style={styles.inputView}>
              <Text style={styles.sText}>Tên ngân hàng  <Text style={{ color: "red" }}>*</Text></Text>
              <TextInput
                containerStyle={styles.textInput}
                placeholder="Nhập tên ngân hàng "
                value={params.bankName}
                onChangeText={text => setParams({
                  ...params,
                  bankName: text,
                })}
                returnKeyType="done"
              />
            </View>

            <TouchableOpacity
              onPress={onRegister}
              activeOpacity={0.7}
              style={styles.bntRegister}
            >
              <Text style={styles.textSigIn}>Gửi</Text>
            </TouchableOpacity>

          </View>

        </ScrollView>
        </KeyboardAwareScrollView>
      </View>


  );

};
