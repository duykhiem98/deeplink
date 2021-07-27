/**
* Created by nghinv on Thu Jun 27 2019
* Copyright (c) 2019 nghinv@lumi.biz
*/

import React, { PureComponent } from 'react';
import {
  StyleSheet, View, Text, Dimensions,
  TouchableWithoutFeedback, TextStyle,
  ScrollView, TouchableOpacity
} from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import _ from 'lodash';

const SCREEN = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    top: SCREEN.height,
    justifyContent: 'flex-end'
  },
  absolute: {
    ...StyleSheet.absoluteFillObject
  },
  viewTop: {
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  containerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 12,
    paddingHorizontal: 16
  },
  txtTitle: {
    fontSize: 17,
    fontWeight: '500',
    marginTop: 12,
  },
  txtMessage: {
    marginTop: 2,
    fontSize: 13,
    textAlign: 'center'
  },
  viewOption: {

  },
  btnOptions: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: 16
  },
  txtOptions: {
    fontSize: 17
  },
  viewSeparator: {
    height: StyleSheet.hairlineWidth
  },
  viewContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    alignSelf: 'flex-start'
  },
  iconLeft: {
    marginRight: 12
  },
  iconCheck: {
    position: 'absolute',
    right: 12,
    alignSelf: 'center'
  },
  btnBottom: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  viewButtonBottom: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  txtBottom: {
    fontSize: 17,
    fontWeight: 'bold'
  },
});

const {
  Value,
  timing,
  block,
  cond,
  eq,
  neq,
  set,
  interpolate,
  clockRunning,
  startClock,
  stopClock,
  Clock,
  call,
  and,
  not
} = Animated;

const STATE = {
  show: 1,
  hide: 0,
  unknow: -1
}

function runTiming(clock, value, dest, duration) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    frameTime: new Value(0),
    time: new Value(0),
  };

  const config = {
    toValue: new Value(0),
    duration: duration || 250,
    easing: Easing.inOut(Easing.cubic),
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.frameTime, 0),
      set(state.time, 0),
      set(state.position, value),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ];
}

class ActionSheet extends PureComponent<Props> {
  constructor(props) {
    super(props);

    this._anim = new Value(STATE.unknow);
    this._show = new Value(0);
    this._top = new Value(SCREEN.height);
    this._opacity = new Value(0);
    this._transY = new Value(SCREEN.height);
    this._heightContent = new Value(-1);
    this._isShow = false;
    this.throttlePress = _.throttle(this.showActionSheet, 75, { trailing: false });
  }

  show = () => {
    this.throttlePress()
  }

  showActionSheet = () => {
    this._anim.setValue(1)
  }

  hide = () => {
    this._anim.setValue(0)
  }

  onPressItem = (item) => {
    this.hide();
    item.onPress && item.onPress()
  }

  onPressBottomButton = () => {
    this.hide();
  }

  onShow = () => {
    this._isShow = true;
    this.props.onShow && this.props.onShow()
  }

  onHide = () => {
    this._isShow = false;
    this.props.onHide && this.props.onHide()
  }

  onPressOverlay = () => {
    if (this._isShow) {
      this.hide()
    }
  }

  renderItem = ({ item, index }) => {
    const {
      renderOption, options, renderCheckSelect, checkSelect, colorCheckSelect,
      buttonColor, heightButton, buttonTitleColor, separatorColor
    } = this.props;

    return (
      <View key={`index_${index}`} style={[styles.viewOption, { height: heightButton }]}>
        <TouchableOpacity
          style={renderOption ? { flex: 1 } : [styles.btnOptions, { backgroundColor: buttonColor }]}
          activeOpacity={0.8}
          onPress={() => this.onPressItem(item)}
        >
          {
            renderOption ? renderOption(item) : item.leftIconName ? (
              <View style={styles.viewContentRow}>
                <Icon style={styles.iconLeft} name={item.leftIconName} size={24} color={'black'} />
                <View style={{ flex: 1, paddingRight: 8 }}>
                  <Text numberOfLines={1} style={[styles.txtOptions, { color: buttonTitleColor }, { ...item.style }]}>
                    {item.title}
                  </Text>
                </View>
              </View>
            ) : (
                <Text numberOfLines={1} style={[styles.txtOptions, { color: buttonTitleColor }, item.style]}>
                  {item.title}
                </Text>
              )
          }
          {
            renderCheckSelect && (checkSelect === index) && (
              <Icon style={styles.iconCheck} name='done' size={20} color={colorCheckSelect} />
            )
          }
        </TouchableOpacity>
        {
          (options.length > 1 && (options.length - 1) !== index) && (
            <View style={[styles.viewSeparator, { backgroundColor: separatorColor }]} />
          )
        }
      </View>
    )
  }

  render() {
    const {
      renderTitle,
      renderMiddle,
      options,
      title,
      message,
      bottomTitle,
      overlayColor,
      heightButton,
      titleStyle,
      messageStyle,
      renderBottomButton,
      bottomStyle,
      buttonColor,
      titleColor,
      buttonTitleColor,
      separatorColor,
      width
    } = this.props;

    const renderOverlayout = (
      <TouchableWithoutFeedback onPress={this.onPressOverlay}>
        <Animated.View
          style={[
            styles.absolute,
            {
              backgroundColor: overlayColor,
              opacity: this._opacity
            }
          ]}
        />
      </TouchableWithoutFeedback>
    );

    const renderTitleTop = (
      <View style={[styles.containerTitle, { backgroundColor: buttonColor, borderBottomColor: separatorColor }]}>
        <Text numberOfLines={1} style={[styles.txtTitle, { color: titleColor }, titleStyle]}>
          {title}
        </Text>
        {
          message ? (
            <Text numberOfLines={2} style={[styles.txtMessage, { color: titleColor }, messageStyle]}>
              {message}
            </Text>
          ) : null
        }
      </View>
    );

    const renderMiddleOptions = (
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        snapToInterval={heightButton}
        style={{ maxHeight: Math.min(500, SCREEN.height - 100) }}>
        {
          options.map((item, index) => {
            return this.renderItem({ item, index })
          })
        }
      </ScrollView>
    );


    const renderBottomTitle = (
      <TouchableOpacity
        style={[styles.btnBottom, { backgroundColor: buttonColor, height: heightButton }]}
        activeOpacity={0.8}
        onPress={this.onPressBottomButton}
      >
        <View style={styles.viewButtonBottom}>
          <Text numberOfLines={1} style={[styles.txtBottom, { color: buttonTitleColor }, bottomStyle]}>
            {bottomTitle}
          </Text>
        </View>
      </TouchableOpacity>
    )

    const clock1 = new Clock();
    const clock2 = new Clock();
    const clock3 = new Clock();
    const clock4 = new Clock();
    const clock5 = new Clock();

    return (
      <>
        <Animated.Code>
          {
            () => block([
              cond(eq(this._anim, STATE.show), [
                set(this._show, 1),
                cond(neq(this._opacity, 0.6), [
                  set(this._opacity, runTiming(clock1, 0, 0.6)),
                  set(this._transY, runTiming(clock2, SCREEN.height, 0))
                ]),
                cond(eq(this._opacity, 0.6), [
                  cond(clockRunning(clock2), [], [
                    call([this._anim], ([anim]) => this.onShow())
                  ]),
                ])
              ]),
              cond(eq(this._anim, STATE.hide), [
                cond(neq(this._opacity, 0), [
                  set(this._opacity, runTiming(clock3, 0.6, 0)),
                  set(this._transY, runTiming(clock4, this._transY, SCREEN.height))
                ]),
                cond(eq(this._opacity, 0), [
                  set(this._show, runTiming(clock5, 1, 0, 30)),
                  cond(clockRunning(clock5), [], [
                    call([this._anim], ([anim]) => this.onHide())
                  ]),
                ]),
              ]),
            ])
          }
        </Animated.Code>
        <Animated.View
          pointerEvents='box-none'
          style={[
            styles.container,
            {
              top: interpolate(this._show, {
                inputRange: [0, 1],
                outputRange: [SCREEN.height, 0],
                extrapolate: 'clamp'
              })
            }
          ]}
        >
          {renderOverlayout}
          <Animated.View
            style={{
              height: SCREEN.height,
              justifyContent: 'flex-end',
              alignSelf: 'center',
              width: width,
              transform: [{ translateY: this._transY }]
            }}
            pointerEvents='box-none'
          >
            <View style={styles.viewTop}>
              {
                renderTitle ? renderTitle() : title ? renderTitleTop : null
              }
              {
                renderMiddle ? renderMiddle() : options ? renderMiddleOptions : null
              }
            </View>
            {
              renderBottomButton ? renderBottomButton() : bottomTitle ? renderBottomTitle : null
            }
          </Animated.View>
        </Animated.View>
      </>
    );
  }
}

ActionSheet.defaultProps = {
  overlayColor: 'black',
  options: [],
  renderCheckSelect: false,
  checkSelect: 0,
  heightButton: 52,
  buttonColor: 'white',
  colorCheckSelect: 'black',
  titleColor: 'black',
  buttonTitleColor: 'black',
  separatorColor: 'rgba(0,0,0,0.6)',
  width: Math.min(420, SCREEN.width - 32)
}

type OptionsType = Array<{
  title?: String;
  leftIconName?: String;
  style?: TextStyle;
  onPress?: () => void;
}>

interface Props {
  title?: String;
  message?: String;
  options?: OptionsType;
  titleStyle?: TextStyle;
  messageStyle?: TextStyle;
  bottomTitle?: String;
  bottomStyle?: TextStyle;
  renderTitle?: () => void;
  renderBottomButton?: () => void;
  renderOption?: () => void;
  renderMiddle?: () => void;
  renderCheckSelect?: Boolean;
  checkSelect?: Number;
  colorCheckSelect?: String;
  buttonColor?: String;
  overlayColor?: String;
  heightButton?: Number;
  titleColor?: String;
  buttonTitleColor?: String;
  separatorColor?: String;
  width?: Number;
  onShow?: () => void;
  onHide?: () => void;
}

export default ActionSheet;
