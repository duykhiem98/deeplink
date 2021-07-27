import React, { useEffect, useState } from "react";
import { Text, View,TouchableOpacity} from "react-native";
import styles from "./styles";
import { Left } from "native-base";
import { Bold } from "../../components";
import styled from "styled-components/native";
import { HeaderBack } from "../../components/Headerback";
import { useSelector } from "react-redux";
import { requestCTV, requestCTVSettings } from "./api";

import NavigationService from "../../navigation/NavigationService";
import Clipboard from "@react-native-clipboard/clipboard";

const Right = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const CollaboratorScreen = ({ route,navigation }) => {

  const params = {};
  const [info, setInfo] = useState({});
  const [level, setLevel] = useState({});
  const [myLevel, setMyLevel] = useState("");
  const [percentLevel, setPercentLevel] = useState("0");



  const getMyLevel = () => {
    if (!info || !level) {
      setMyLevel("0");
      setPercentLevel(0)
      return;
    }
    if (info.amountEarnThisMonth >= level.valueLevel4) {
      setMyLevel("4");
      setPercentLevel(level.percentLevel4 || '0')
      return;
    }
    if (info.amountEarnThisMonth >= level.valueLevel3) {
      setMyLevel("3");
      setPercentLevel(level.percentLevel3 || '0')
      return;
    }
    if (info.amountEarnThisMonth >= level.valueLevel2) {
      setMyLevel("2");
      setPercentLevel(level.percentLevel2 || '0')
      return;
    }
    if (info.amountEarnThisMonth >= level.valueLevel1) {
      setMyLevel("1");
      setPercentLevel(level.percentLevel1 || '0')
      return;
    }
    setMyLevel("0");
    setPercentLevel('0')
    console.log(myLevel);
  };

  useEffect(() => {
    getMyLevel();
  }, [info, level]);

  const token = useSelector(state => state.config.token);
  const getInfoCTV = async () => {
    const ctvInfo = await requestCTV(params, token);
    console.log("ctvInfo", ctvInfo);
    setInfo(ctvInfo);
  };
  const getLevelCTV = async () => {
    const ctvLevel = await requestCTVSettings(params, token);
    console.log("ctvLevel", ctvLevel);
    setLevel(ctvLevel);
  };

  useEffect(() => {
    getInfoCTV();
    getLevelCTV();
  }, []);
  const copyToClipboard = () => {
    Clipboard.setString('http://localhost')
    console.log(copyToClipboard)
  }
  return (
    <View style={styles.container}>
      <HeaderBack title={"Cộng tác viên"} />

      <View style={styles.separatorView} />
      {
        info.customerId ?
          <View style={styles.container}>

            <View style={styles.viewPercent}>
              <Left style={styles.left}>
                <Text style={styles.textTitle}>
                  <Bold>
                    Mã giới thiệu
                  </Bold>
                </Text>
              </Left>
              <Right>
                <Text style={styles.textTitle1}>
                  {info?.refCode}
                </Text>
              </Right>
            </View>
            <View style={styles.separatorView} />
            <View style={{
              padding: 16,
              backgroundColor: "white",
            }}>
              <Text style={styles.textTitle}><Bold>Cộng tác viên cấp {myLevel}:</Bold> Số tiền đơn hàng tích luỹ trong tháng của bạn
                là {info.amountEarnThisMonth} vnđ, tương ứng với mức chiết khấu {percentLevel}%.
              </Text>
            </View>
            <View style={styles.separatorView} />
            <View style={styles.viewPercent}>
              <Left style={styles.left}>
                <Text style={styles.textTitle}>
                  <Bold>
                    Số người giới thiệu trong tháng
                  </Bold>
                </Text>
              </Left>
              <Right>
                <Text style={styles.textTitle1}>{info.numberNewCustomer} người</Text>
              </Right>
            </View>

            <View style={styles.botWith} />

            <View style={styles.viewPercent}>
              <Left style={styles.left}>
                <Text style={styles.textTitle}>
                  <Bold>
                    Tổng số người đã giới thiệu
                  </Bold>
                </Text>
              </Left>
              <Right>
                <Text style={styles.textTitle1}>
                  {info?.numberTotalCustomer} người
                </Text>
              </Right>
            </View>

            <View style={styles.separatorView} />

            <View style={styles.viewPercent}>
              <Left style={styles.left}>
                <Text style={styles.textTitle}>
                  <Bold>
                    Giá trị đơn hàng trong tháng
                  </Bold>
                </Text>
              </Left>
              <Right>
                <Text style={styles.textTitle1}>{info.amountBillThisMonth} vnđ</Text>
              </Right>
            </View>

            <View style={styles.botWith} />

            <View style={styles.viewPercent}>
              <Left style={styles.left}>
                <Text style={styles.textTitle}>
                  <Bold>
                    Số tiền kiếm được trong tháng
                  </Bold>
                </Text>
              </Left>
              <Right>
                <Text style={styles.textTitle1}>{info.amountEarnThisMonth} vnđ</Text>
              </Right>
            </View>

            <View style={styles.separatorView} />

            <View style={styles.viewPercent}>
              <Left style={styles.left}>
                <Text style={styles.textTitle}>
                  <Bold>
                    Tổng số tiền đã kiếm được
                  </Bold>
                </Text>
              </Left>
              <Right>
                <Text style={styles.textTitle1}>{info.amountTotal} vnđ</Text>
              </Right>
            </View>
            <View style={styles.separatorView} />
            <View style={styles.viewSuccess}>
              <Left style={styles.left}>
                <Text style={styles.textTitle}>
                  <Bold>
                    Link giới thiệu
                  </Bold>
                </Text>
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
          </View>
          :
          <View style={styles.container}>
          <View style={{flex: 1,alignItems:"center",justifyContent:'center'}}>
            <View style={{alignItems:"center",justifyContent:"center"}}>
              <Text style={styles.textTitle}>
                Bạn chưa có tài khoản Cộng tác viên !
              </Text>
              <TouchableOpacity onPress={() => { NavigationService.navigate('GioiThieuCTVScreen'); }}>
                <Text> <Bold>Đăng kí ngay</Bold></Text>
              </TouchableOpacity>
            </View>
          </View>
          </View>
    }
    </View>
  );

};
