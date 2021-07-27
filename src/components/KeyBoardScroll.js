/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const KeyBoardScroll = ({ children, ...otherProps }) => {
  return (
    <KeyboardAwareScrollView
      extraScrollHeight={20}
      keyboardShouldPersistTaps='handled'
      keyboardDismissMode='on-drag'
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
      enableResetScrollToCoords={true}
      enableOnAndroid={true}
      scrollEnabled={true}
      behavior={'height'}
      {...otherProps}
    >
      {children}
    </KeyboardAwareScrollView>
  );
}

export default KeyBoardScroll;
