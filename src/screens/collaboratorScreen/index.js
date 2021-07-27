import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import styles from "./styles";
import { IC_Bg1, IC_Bg2, IC_Bg3 } from "../../icon";
import NavigationService from "../../navigation/NavigationService";
import { HeaderBack } from "../../components/Headerback";

export const GioiThieuCTVScreen = () => {
  const [bannerHeight, setBannerHeight] = useState(0);
  const [bannerHeight1, setBannerHeight1] = useState(0);
  const [bannerHeight2, setBannerHeight2] = useState(0);


  const { width } = useWindowDimensions();

  useEffect(() => {
    // banner 1
    const { width: wImage, height: hImage } = Image.resolveAssetSource(IC_Bg1);
    const ratio = wImage / width;
    setBannerHeight(hImage / ratio);


    // banner 2
    const { width: wImage1, height: hImage1 } = Image.resolveAssetSource(IC_Bg2);
    const ratio1 = wImage1 / width;
    setBannerHeight1(hImage1 / ratio1);

    // banner 2
    const { width: wImage2, height: hImage2 } = Image.resolveAssetSource(IC_Bg3);
    const ratio2 = wImage2 / width;
    setBannerHeight2(hImage2 / ratio2);


  }, [width]);


  return (
    <View style={styles.container}>
      <HeaderBack title={"Giới thiệu CTV"} />
      <View style={styles.separatorView} />

      <View style={styles.body}>
        <Image source={IC_Bg1} style={{
          width: width,
          height: bannerHeight,
        }} />

        <View style={styles.separatorView} />

        <Image source={IC_Bg2} style={{
          width: width,
          height: bannerHeight1,
        }} />

        <View style={styles.separatorView} />

        <Image source={IC_Bg3} style={{
          width: width,
          height: bannerHeight2,
        }}  />
      </View>

      <TouchableOpacity
        onPress={() => {
          NavigationService.navigate("RegisterCTV");
        }}
        activeOpacity={0.7}
        style={styles.buttonSignIn}
      >
        <Text style={styles.textSigIn}>Đăng ký ngay</Text>
      </TouchableOpacity>


    </View>
  );

};
