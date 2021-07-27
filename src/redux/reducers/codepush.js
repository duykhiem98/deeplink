/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

const initialState = {
  status: -1,
  progress: 0
};

import * as types from '../types';

export default function (state = initialState, action) {
  if (action.type == types.UPDATE_CODEPUSH_DATA) {
    return action.payload
  }

  return state;
}
