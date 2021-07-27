import React, { Component } from "react";
import {
  Text,
  FlatList,
  View,
  Image,
  StatusBar,
  TouchableOpacity,
  RefreshControl,
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
import { Images } from "../../themes/";
import styles from "./styles";
import RowProduct from "./RowProduct";
import { Fonts, Metrics, Colors } from "../../themes/";
import { KeyBoardScroll } from "../../components";
import FastImage from 'react-native-fast-image';
import { getImageUrl } from "../../common/utils";
import { PRIORITY, RESIZE_MODE } from "../../common/constant";

class Live extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  onClickProductItem = (item) => {
    this.props.navigation.navigate("productDetail", { id: item.id });
  }
  renderRowProduct = ({ item, index }) => {
    return (
      <RowProduct
        rowData={item}
        onClickItem={this.onClickProductItem} />
    );
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
    const { livestreamDetail, storeDetail, products } = this.props;
    const imageUrl = getImageUrl(livestreamDetail.imageUrl);
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
              <Text style={styles.headerTitle}>Live</Text>
            </TouchableOpacity>
          </Left>
        </Header>

        <View style={{ flex: 1 }}>
          <KeyBoardScroll>
            <View style={styles.viewLive}>
              {
                imageUrl ? <FastImage
                  style={styles.itemLive}
                  source={{
                    uri: imageUrl,
                    priority: PRIORITY,
                  }}
                  resizeMode={RESIZE_MODE}
                /> : <Image style={styles.itemLive} source={Images.bg_live} />
              }

              <View style={styles.viewLiveTitle}>
                <View style={styles.viewLiveTitleLeft}>
                  <Text style={styles.liveTitle}>{livestreamDetail.name}</Text>
                  <Text style={styles.liveCount}>{livestreamDetail.description}</Text>
                </View>
                <View style={styles.viewLiveTitleRight}>
                  <MaterialIcons name="more-vert" size={24} style={styles.icon} />
                </View>
              </View>
            </View>

            <View style={styles.separatorView} />

            <View style={styles.viewSeller}>
              <Image
                source={Images.bg_live}
                style={styles.itemAvatar} />

              <View style={styles.viewSellerRight}>
                <Text style={styles.itemSeller}>{storeDetail && storeDetail.name || ` `}</Text>
                <Text style={styles.itemTitle}>{storeDetail && storeDetail.description || ` `}</Text>
              </View>
            </View>

            <View style={styles.viewNewProduct}>
              <View style={styles.newArrivalSec}>
                <Text style={styles.titelText}>Sản phẩm</Text>
              </View>
              {
                products.data && products.data.length > 0 ? (
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={products.data}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={this.renderRowProduct}
                    extraData={this.state}
                  // refreshControl={
                  //   <RefreshControl
                  //     refreshing={false}
                  //     onRefresh={this.onRefresh}
                  //   />
                  // }
                  />
                ) : this.renderEmptyView()
              }
            </View>
          </KeyBoardScroll>
        </View>
      </Container>
    );
  }
}

export default Live;