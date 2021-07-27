/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import React, { PureComponent } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, Platform, Dimensions } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import KeyboardScroll from './KeyBoardScroll';
import { Fonts, Metrics, Colors } from "../themes/";

const SCREEN = Dimensions.get('window');
const STATUS_BAR_OFFSET = (Platform.OS === 'android' ? -25 : 0);
const {
  Value
} = Animated;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  viewButton: {
    height: 42,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: Colors.txtGrey
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtButton: {
    fontSize: 14,
    fontWeight: '500',
    color: Colors.red,
    textAlign: 'center'
  },
  viewContent: {
    alignItems: 'center',
    padding: 16
  },
  content: {

  },
  txtTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
    textAlign: 'center'
  },
  txtMessage: {
    fontSize: 14,
    fontWeight: '300',
    color: Colors.black,
    textAlign: 'center'
  }
});

class Alert extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: this.props.isOpen || false,
      target: {
        x: 0,
        y: 0,
        opacity: 0.6,
      },
      scale: new Animated.Value(0)
    }

    this.dataAlert = null
    this._anim = new Value(0);
  }

  alert = (props) => {
    this.dataAlert = {
      title: props.title ? props.title : null,
      message: props.message ? props.message : null,
      leftButton: props.leftButton ? props.leftButton : null,
      rightButton: props.rightButton ? props.rightButton : null,
      onClose: props.onClose ? props.onClose : null,
      renderContent: props.renderContent ? props.renderContent : null,
      width: props.width ? props.width : null,
      borderRadius: props.borderRadius ? props.borderRadius : null,
      hasTextInput: props.hasTextInput ? props.hasTextInput : null,
    }
    this.open()
  }

  update = () => {
    this.forceUpdate()
  }

  isOpen = () => {
    return this.state.isOpen;
  }

  open = () => {
    this.setState({
      isOpen: true
    }, () => {
      Animated.spring(this._anim, {
        stiffness: new Value(100),
        mass: new Value(1),
        duration: 10,
        damping: new Value(10),
        overshootClamping: true,
        restSpeedThreshold: 0.001,
        restDisplacementThreshold: 0.001,
        toValue: 1
      }).start(() => {
        this.props.onOpen && this.props.onOpen()
      })
    });
  }

  close = (onClose) => {
    Animated.timing(this._anim, {
      toValue: 0,
      duration: 10,
      easing: Easing.inOut(Easing.ease)
    }).start(() => {
      this.setState({
        isOpen: false,
      });
      this.dataAlert && this.dataAlert.onClose && this.dataAlert.onClose()
      this.dataAlert = null;
      this.props.onClose && this.props.onClose()
      onClose && onClose()
    })
  }

  componentWillReceiveProps(props) {
    if (this.props.isOpen != props.isOpen && props.isOpen) {
      this.open();
    }
  }

  componentWillUnmount() {
    if (this.timeoutAlertLeftButton) {
      clearTimeout(this.timeoutAlertLeftButton)
    }

    if (this.timeoutAlertRightButton) {
      clearTimeout(this.timeoutAlertRightButton)
    }
  }

  renderButton = () => {
    let leftButton = null;
    let rightButton = null;
    let middleButton = null
    if (this.dataAlert) {
      leftButton = this.dataAlert.leftButton
      rightButton = this.dataAlert.rightButton
      middleButton = this.dataAlert.middleButton
    } else {
      leftButton = this.props.leftButton
      rightButton = this.props.rightButton
      middleButton = this.props.middleButton
    }

    if (!leftButton && !rightButton && !middleButton) return null

    return (
      <View style={[styles.viewButton, { width: Math.min(266, SCREEN.width - 16) }]}>
        {
          leftButton && leftButton.text && (
            <TouchableOpacity
              onPress={() => {
                this.close();
                if (this.timeoutAlertLeftButton) {
                  clearTimeout(this.timeoutAlertLeftButton)
                }

                this.timeoutAlertLeftButton = setTimeout(() => {
                  leftButton.onPress && leftButton.onPress()
                }, 220)
              }}
              style={styles.button}
            >
              <Text style={[styles.txtButton, leftButton.textStyle, { color: Colors.txtGrey }]}>
                {leftButton.text}
              </Text>
            </TouchableOpacity>
          )
        }
        {
          middleButton && middleButton.text && (
            <TouchableOpacity
              onPress={() => {
                this.close();
                if (this.timeoutAlertmiddleButton) {
                  clearTimeout(this.timeoutAlertmiddleButton)
                }

                this.timeoutAlertmiddleButton = setTimeout(() => {
                  middleButton.onPress && middleButton.onPress()
                }, 220)
              }}
              style={[
                styles.button,
                leftButton ? { borderLeftWidth: 0.5, borderLeftColor: Colors.txtGrey } : undefined
              ]}
            >
              <Text style={[styles.txtButton, middleButton.textStyle]}>
                {middleButton.text}
              </Text>
            </TouchableOpacity>
          )
        }
        {
          rightButton && rightButton.text && (
            <TouchableOpacity
              onPress={() => {
                if (!rightButton.dontClose) {
                  this.close();
                  if (this.timeoutAlertRightButton) {
                    clearTimeout(this.timeoutAlertRightButton)
                  }

                  this.timeoutAlertRightButton = setTimeout(() => {
                    rightButton.onPress && rightButton.onPress()
                  }, 220)
                } else {
                  rightButton.onPress && rightButton.onPress()
                }
              }}
              style={[
                styles.button,
                (leftButton || middleButton) ? { borderLeftWidth: 0.5, borderLeftColor: Colors.txtGrey } : undefined
              ]}
            >
              <Text style={[styles.txtButton, rightButton.textStyle]}>
                {rightButton.text}
              </Text>
            </TouchableOpacity>
          )
        }
      </View>
    )
  }

  renderContent = () => {
    let {
      renderContent
    } = this.props;
    let message = null
    let title = null

    if (this.dataAlert) {
      renderContent = this.dataAlert.renderContent
      message = this.dataAlert.message
      title = this.dataAlert.title
    } else {
      message = this.props.message
      title = this.props.title
    }


    if (renderContent) {
      return renderContent()
    }

    return (
      <View style={styles.viewContent}>
        {
          title && <Text style={styles.txtTitle}>{title}</Text>
        }
        {
          message && <Text style={[styles.txtMessage, title ? { marginTop: 4 } : undefined]}>{message}</Text>
        }
      </View>
    )
  }

  render() {
    const {
      origin,
      backgroundOverlay,
      style,
      modal
    } = this.props;
    let { width, borderRadius, hasTextInput } = this.props;
    if (this.dataAlert && this.dataAlert.width) {
      width = this.dataAlert.width
    }

    if (this.dataAlert && this.dataAlert.borderRadius) {
      borderRadius = this.dataAlert.borderRadius
    }

    if (this.dataAlert && this.dataAlert.hasTextInput) {
      hasTextInput = this.dataAlert.hasTextInput
    }

    const {
      isOpen,
      target,
    } = this.state;

    const lightboxOpacityStyle = {
      opacity: this._anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.6],
        extrapolate: 'clamp'
      })
    }

    const contentOpacityStyle = {
      opacity: this._anim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp'
      })
    }

    const openStyle = [styles.open, {
      left: this._anim.interpolate({ inputRange: [0, 1], outputRange: [origin.x, target.x], extrapolate: 'clamp' }),
      top: this._anim.interpolate({ inputRange: [0, 1], outputRange: [origin.y + STATUS_BAR_OFFSET, target.y], extrapolate: 'clamp' }),
      width: this._anim.interpolate({ inputRange: [0, 1], outputRange: [origin.width, SCREEN.width], extrapolate: 'clamp' }),
      height: this._anim.interpolate({ inputRange: [0, 1], outputRange: [origin.height, SCREEN.height], extrapolate: 'clamp' }),
      transform: [
        {
          scale: (this.dataAlert && this.dataAlert.notScale) ? 1 : this._anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp'
          })
        }
      ]
    }];

    const background = (
      <Animated.View
        style={[
          styles.background,
          { backgroundColor: backgroundOverlay },
          lightboxOpacityStyle
        ]}
      />
    );

    const content = (
      <Animated.View pointerEvents='box-none' style={[openStyle, contentOpacityStyle, styles.center]}>
        <View style={
          [
            styles.content,
            {
              width,
              borderRadius,
              overflow: 'hidden',
              backgroundColor: 'white'
            }, style
          ]}
        >
          {this.renderContent()}
          {this.renderButton()}
        </View>
      </Animated.View>
    )

    if (modal) {
      return (
        <Modal visible={isOpen} transparent={true} onRequestClose={() => this.close()} >
          {
            hasTextInput && (
              <KeyboardScroll scrollEnabled={false}>
                {background}
                {content}
              </KeyboardScroll>
            )
          }
          {!hasTextInput && background}
          {!hasTextInput && content}
        </Modal>
      );
    }

    if (isOpen) {
      return (
        <View style={styles.absolute}>
          {
            hasTextInput && (
              <KeyboardScroll scrollEnabled={false}>
                {background}
                {content}
              </KeyboardScroll>
            )
          }
          {!hasTextInput && background}
          {!hasTextInput && content}
        </View>
      )
    }

    return null
  }
}

Alert.defaultProps = {
  origin: {
    x: SCREEN.width / 2,
    y: SCREEN.height / 2,
    width: 0,
    height: 0
  },
  springConfig: { tension: 30, friction: 7 },
  isOpen: false,
  backgroundOverlay: 'rgba(0, 0, 0, 1)',
  width: Math.min(266, SCREEN.width - 16),
  hasTextInput: false,
  borderRadius: 12,
  modal: false
}

type OriginStatic = {
  x?: number;
  y?: number;
  width?: number | string;
  height?: number;
}

type SpringConfigStatic = {
  tension?: number;
  friction?: number;
}

type ButtonStatic = {
  text?: string;
  onPress?: () => void;
  textStyle?: StyleProp<TextStyle>;
}

interface Props {
  origin?: OriginStatic;
  springConfig?: SpringConfigStatic;
  message?: string;
  borderRadius?: number;
  title?: string;
  leftButton?: ButtonStatic;
  rightButton?: ButtonStatic;
  isOpen?: boolean;
  backgroundOverlay?: string;
  width?: number | string;
  style?: StyleProp<ViewStyle>;
  renderContent?: () => void;
  onOpen?: () => void;
  onClose?: () => void;
  hasTextInput?: boolean;
  modal?: boolean;
}

export default Alert;
