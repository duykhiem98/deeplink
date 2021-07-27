/**
* Created by bavv on Thu Jun 13 2019
* Copyright (c) 2019 bavv@gemvietnam.com
*/

'use strick';

import React from 'react';
import { StyleSheet, Platform, Text } from 'react-native';

/*
* Function remove console.log, console.error, console.warning
*/
export const removeLog = () => {
  console = {};
  console.log = () => { };
  console.error = () => { };
  console.warning = () => { };
}

/***
* Function set font default
* @param font like: 'Quicksand'
* @requires font link to ios and android
*/
export const setFont = (font) => {
  const styles = StyleSheet.create({
    defaultFontFamily: {
      fontFamily: font
    }
  });

  const oldRender = Text.render;
  Text.render = function (...args) {
    const origin = oldRender.call(this, ...args);
    return React.cloneElement(origin, {
      style: [styles.defaultFontFamily, origin.props.style]
    });
  }
}

export const isAndroid = Platform.select({
  android: true,
  ios: false,
});

export const getImageUrl = (url) => {
  if (url && (url.startsWith('http') || url.startsWith('https'))) return url;
  else return '';
}

export const formatCurency = (value) => {
  if (!value) value = 0;
  return `đ${`${value}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
}

export const isNullOrEmpty = (value) => {
  return !value || !value.trim().length === 0;
}

export const debounce = (func, wait, immediate) => {
  var timeout;

  return function executedFunction() {
    var context = this;
    var args = arguments;

    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};