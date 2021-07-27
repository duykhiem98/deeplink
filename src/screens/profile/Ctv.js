import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity,View } from "react-native";
import NavigationService from "../../navigation/NavigationService";
import styles from "./styles";
import { IC_BANER } from "../../icon";
import { useSelector } from "react-redux";
import { requestCTV } from "../collaboratorScreen/api";
import { Row } from "../../components";
import { Colors, Metrics } from "../../themes";

export const Ctv= () => {
  const params = {};
  const [info, setInfo] = useState({});
  const token = useSelector(state => state.config.token);
  const getInfoCTV = async () => {
    const ctvInfo = await requestCTV(params, token);
    console.log("ctvInfo", ctvInfo);
    setInfo(ctvInfo);
  };
  useEffect(() => {
    getInfoCTV();
  }, []);

  return(
    <View>
      <Row
        leftTitle={'Cộng tác viên'}
        containerStyle={{ width: Metrics.WIDTH - 32 }}
        rightTitleStyle={{ color: Colors.red }}
        rightIcon={true}
        rightTitle={`${info?.amountEarnThisMonth || "0 " }vnđ`}
        onPress={() => { NavigationService.navigate('collaboratorScreen'); }}
      />
    </View>

)
}
