/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import * as types from '../types';

export function updateCodepushData(state) {
  return {
    type: types.UPDATE_CODEPUSH_DATA,
    payload: state
  };
}
