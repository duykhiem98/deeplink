import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity,View } from "react-native";
import NavigationService from "../../navigation/NavigationService";
import styles from "./styles";
import { IC_BANER } from "../../icon";
import { useSelector } from "react-redux";
import { requestCTV } from "../collaboratorScreen/api";

export const Banner = () => {
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
      <TouchableOpacity
        onPress={() => {
          info.customerId ?
            NavigationService.navigate('collaboratorScreen')
            :
            NavigationService.navigate('GioiThieuCTVScreen')
        }}
        style={styles.banerView}>
        <Image source={IC_BANER}
               style={{width:"100%",height:180,resizeMode:"cover",borderRadius:10}}
        />
      </TouchableOpacity>
    </View>


  )
}
