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
      <HeaderBack title={"C???ng t??c vi??n"} />

      <View style={styles.separatorView} />
      {
        info.customerId ?
          <View style={styles.container}>

            <View style={styles.viewPercent}>
              <Left style={styles.left}>
                <Text style={styles.textTitle}>
                  <Bold>
                    M?? gi???i thi???u
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
              <Text style={styles.textTitle}><Bold>C???ng t??c vi??n c???p {myLevel}:</Bold> S??? ti???n ????n h??ng t??ch lu??? trong th??ng c???a b???n
                l?? {info.amountEarnThisMonth} vn??, t????ng ???ng v???i m???c chi???t kh???u {percentLevel}%.
              </Text>
            </View>
            <View style={styles.separatorView} />
            <View style={styles.viewPercent}>
              <Left style={styles.left}>
                <Text style={styles.textTitle}>
                  <Bold>
                    S??? ng?????i gi???i thi???u trong th??ng
                  </Bold>
                </Text>
              </Left>
              <Right>
                <Text style={styles.textTitle1}>{info.numberNewCustomer} ng?????i</Text>
              </Right>
            </View>

            <View style={styles.botWith} />

            <View style={styles.viewPercent}>
              <Left style={styles.left}>
                <Text style={styles.textTitle}>
                  <Bold>
                    T???ng s??? ng?????i ???? gi???i thi???u
                  </Bold>
                </Text>
              </Left>
              <Right>
                <Text style={styles.textTitle1}>
                  {info?.numberTotalCustomer} ng?????i
                </Text>
              </Right>
            </View>

            <View style={styles.separatorView} />

            <View style={styles.viewPercent}>
              <Left style={styles.left}>
                <Text style={styles.textTitle}>
                  <Bold>
                    Gi?? tr??? ????n h??ng trong th??ng
                  </Bold>
                </Text>
              </Left>
              <Right>
                <Text style={styles.textTitle1}>{info.amountBillThisMonth} vn??</Text>
              </Right>
            </View>

            <View style={styles.botWith} />

            <View style={styles.viewPercent}>
              <Left style={styles.left}>
                <Text style={styles.textTitle}>
                  <Bold>
                    S??? ti???n ki???m ???????c trong th??ng
                  </Bold>
                </Text>
              </Left>
              <Right>
                <Text style={styles.textTitle1}>{info.amountEarnThisMonth} vn??</Text>
              </Right>
            </View>

            <View style={styles.separatorView} />

            <View style={styles.viewPercent}>
              <Left style={styles.left}>
                <Text style={styles.textTitle}>
                  <Bold>
                    T???ng s??? ti???n ???? ki???m ???????c
                  </Bold>
                </Text>
              </Left>
              <Right>
                <Text style={styles.textTitle1}>{info.amountTotal} vn??</Text>
              </Right>
            </View>
            <View style={styles.separatorView} />
            <View style={styles.viewSuccess}>
              <Left style={styles.left}>
                <Text style={styles.textTitle}>
                  <Bold>
                    Link gi???i thi???u
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
                B???n ch??a c?? t??i kho???n C???ng t??c vi??n !
              </Text>
              <TouchableOpacity onPress={() => { NavigationService.navigate('GioiThieuCTVScreen'); }}>
                <Text> <Bold>????ng k?? ngay</Bold></Text>
              </TouchableOpacity>
            </View>
          </View>
          </View>
    }
    </View>
  );

};
