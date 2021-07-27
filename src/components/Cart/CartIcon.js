import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import { connect } from 'react-redux';
import { Fonts, Metrics, Colors } from "../../themes";
import { _global } from '../../core/global';
import { getMyCartSelector } from '../../containers/cart/selector';

const styles = StyleSheet.create({
  container: {
    width: 42,
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionView: {
    width: 36,
    height: 36,
    borderRadius: 25,
    backgroundColor: Colors.greys,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    color: Colors.black,
    alignSelf: "center"
  },
  badgeIcon: {
    position: 'absolute',
    width: 20,
    height: 20,
    top: 0,
    right: 0,
    borderRadius: 10,
    backgroundColor: Colors.red,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: Colors.white,
    fontSize: Fonts.moderateScale(9),
    textAlign: 'center'
  },
});


class CartIcon extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    let { cart, onPress } = this.props;
    const count = cart && cart.items && cart.items.length || undefined;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.actionView}
          onPress={onPress}
        >
          <EvilIcons name="cart" size={26} style={styles.icon} />
        </TouchableOpacity>
        {
          count && <View style={styles.badgeIcon} >
            <Text style={styles.badgeText}>{count}</Text>
          </View>
        }

      </View>
    )
  }
}

const mapDispathToProps = {
}

const mapStateToProps = (state, props) => {
  return {
    cart: getMyCartSelector(state, props),
  }
}

export default connect(mapStateToProps, mapDispathToProps)(CartIcon);