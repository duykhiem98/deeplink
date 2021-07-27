import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";
import { Left, Right } from "native-base";
import { HeaderBack } from "../../components/Headerback";
import Clipboard from "@react-native-clipboard/clipboard";
import NavigationService from "../../navigation/NavigationService";




export const successCTV = ({ route, navigation }) => {

  console.log('route ok men ', route, navigation.state)
  const registerData = navigation?.state?.params?.registerData || {};

  const copyToClipboard = () => {
    Clipboard.setString('http://localhost')
    console.log(copyToClipboard)
  }
  return (
    <View style={styles.container}>
     <HeaderBack title={'Đăng ký CTV thành công'} />
      <View style={styles.separatorView} />

      <View style={styles.viewSuccess}>
        <Left style={styles.left}>
          <Text style={styles.textTitle}>Mã giới thiệu </Text>
        </Left>
        <Right style={styles.right}>
          <Text style={styles.textTitle1}>{registerData.refCode}</Text>
        </Right>
      </View>
      <View style={styles.separatorView} />

      <View style={{
        padding: 16,
        backgroundColor: "white",
      }}>
        <Text style={styles.textTitle}>Nhận chiết khấu trên từng đơn hàng tương ứng với số tiền đơn hàng bạn giới thiệu
          được</Text>
      </View>

      <View style={styles.viewPercent}>
        <Left style={styles.left}>
          <Text style={styles.textTitle}>Dưới 10M/tháng </Text>
        </Left>
        <Right style={styles.right}>
          <Text style={styles.textTitle1}>10%</Text>
        </Right>
      </View>

      <View style={styles.botWith} />

      <View style={styles.viewPercent}>
        <Left style={styles.left}>
          <Text style={styles.textTitle}>10M-50M/tháng</Text>
        </Left>
        <Right style={styles.right}>
          <Text style={styles.textTitle1}>15%</Text>
        </Right>
      </View>
      <View style={styles.botWith} />

      <View style={styles.viewPercent}>
        <Left style={styles.left}>
          <Text style={styles.textTitle}>50-200M/tháng</Text>
        </Left>
        <Right style={styles.right}>
          <Text style={styles.textTitle1}>20%</Text>
        </Right>
      </View>
      <View style={styles.botWith} />

      <View style={styles.viewPercent}>
        <Left style={styles.left}>
          <Text style={styles.textTitle}>> 200M/tháng</Text>
        </Left>
        <Right style={styles.right}>
          <Text style={styles.textTitle1}>30%</Text>
        </Right>
      </View>

      <View style={styles.separatorView} />
      <View style={styles.viewSuccess}>
        <Left style={styles.left}>
          <Text style={styles.textTitle}>Link giới thiệu</Text>
        </Left>
        <Right style={styles.right1}>
          <Text style={styles.textTitle1}>http://localhost</Text>
          <TouchableOpacity
            onPress={copyToClipboard}
            style={styles.bntCopy}>
            <Text style={styles.textSigIn}>copy</Text>
          </TouchableOpacity>
        </Right>
      </View>
      <TouchableOpacity
        onPress={()=>{NavigationService.reset('homeStack')}}
        activeOpacity={0.7}
        style={styles.bntRegister}
      >
        <Text style={styles.textSigIn}>Tiếp tục</Text>
      </TouchableOpacity>

    </View>
  );

};
