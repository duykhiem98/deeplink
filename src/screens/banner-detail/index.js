import React, { Component } from "react";
import {
  Text,
  FlatList,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  Platform,
  BackHandler,
  ScrollView,
} from "react-native";
import {
  Container,
  Content,
  Button,
  Icon,
  Right,
  Item,
  Input,
  Header,
  Left,
  Body,
  Title,
} from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Swiper from "react-native-swiper";
import FastImage from 'react-native-fast-image';
import RBSheet from "react-native-raw-bottom-sheet";
import styles from "./styles";
import { Fonts, Metrics, Colors, Images } from "../../themes";
import ProductVariant from "../../components/Product/ProductVariant";
import { formatCurency } from "../../common/utils";
import { KeyBoardScroll } from "../../components";
import CartIcon from "../../components/Cart/CartIcon";
import { PRIORITY, RESIZE_MODE } from "../../common/constant";

class BannerDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  renderEmptyView = () => {
    return (
      <View style={styles.viewEmpty}>
        <Text style={[styles.txtEmpty, { marginBottom: 10 }]}>
          Chưa có dữ liệu
        </Text>
        {/* <TouchableOpacity activeOpacity={0.7} onPress={this.reScan}>
          <MaterialIcons name='autorenew' size={48} color={Colors.black} />
        </TouchableOpacity> */}
      </View>
    )
  }

  render() {
    const { banner } = this.props;
    console.log(`banner:`, banner);

    // StatusBar.setBarStyle("light-content", true);
    // if (Platform.OS === "android") {
    //   StatusBar.setBackgroundColor("#0e1130", true);
    //   StatusBar.setTranslucent(true);
    // }
    return (
      <Container>
        <Header style={styles.header} transparent androidStatusBarColor={Colors.red}>
          <Left style={styles.left}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() => this.props.navigation.pop()}
            >
              <MaterialIcons name="keyboard-backspace" size={24} color={Colors.black} />
              <Text style={styles.headerTitle}>{banner.title}</Text>
            </TouchableOpacity>
          </Left>
        </Header>

        <View style={{ flex: 1 }}>
          <KeyBoardScroll>
            <View style={styles.slidesec}>
              <FastImage
                style={styles.sliderImage}
                source={{
                  uri: banner.image,
                  priority: PRIORITY,
                }}
                resizeMode={RESIZE_MODE}
              />
            </View>

            {/* <View style={styles.separatorView} /> */}

            <Text style={styles.title}>
              {banner.title}
            </Text>
            <View
              style={{
                paddingRight: Metrics.WIDTH * 0.02,
                paddingLeft: Metrics.WIDTH * 0.02
              }}
            >
              <Text style={styles.qus}>
                {banner.description}
              </Text>
            </View>
          </KeyBoardScroll>
        </View>

        <RBSheet
          ref={ref => { this.RBSheet = ref; }}
          height={400}
          openDuration={250}
          // closeOnDragDown
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10
            }
          }}
        >
          <ProductVariant
            onClose={() => this.RBSheet.close()}
          />
        </RBSheet>
      </Container>
    );
  }

}

export default BannerDetail;