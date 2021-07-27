import React, {memo, ReactElement} from 'react';
import styled from "styled-components/native";
import {TextStyle, ViewStyle,StyleSheet} from "react-native";
import { Header } from "native-base";
import NavigationService from "../navigation/NavigationService";
import { IC_BACK } from "../icon";
import { Colors, Metrics } from "../themes";

const Left = styled.TouchableOpacity`
  width: 40px;
  height: 100%;
  flex-direction: row;
  align-items: center;
`;

const Center = styled.View`
  flex: 1;
  align-items: flex-start;
  justify-content: center;
`;

const Right = styled.View`
  width: 30px;
  height: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding-right: 16px;
`;

const Icon = styled.Image`
  width: 28px;
  height: 28px;
`;

const BannerText = styled.Text`
  font-size: 20px;
  color: black;
`;

interface Props {
  title: string,
  right?: ReactElement,
  center?: ReactElement,
  rightContainerStyle?: ViewStyle,
  containerStyle?: ViewStyle,
  backColor?: string,
  titleStyle?: TextStyle
}

export const HeaderBack = memo(function HomeHeader(props: Props) {
  const {title, right, center, rightContainerStyle, containerStyle, backColor, titleStyle} = props;
  const goBack=() => {
    NavigationService.back();
  }
  return (
    <Header style={styles.header} transparent androidStatusBarColor={Colors.red}>
      <Left onPress={goBack}>
        <Icon source={IC_BACK} color={backColor}/>
      </Left>
      <Center>
        {
          center
            ? center
            : <BannerText
              numberOfLines={1}
              style={titleStyle}>
              {title}
            </BannerText>
        }
      </Center>
      <Right style={rightContainerStyle}>
        {right ? right : null}
      </Right>
    </Header>
  )
});

const styles = StyleSheet.create({
  header: {
    backgroundColor: "white",
  },
})
