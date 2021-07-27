/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import { Component } from 'react';
import { Connection } from '../api/connection';
import { Alert, Loading } from '../components';
import SocketIO from '../socket';

interface GLOBAL {
  /**
   *  Connection
   */
  Alert?: Alert;
  Loading?: Loading;
  connection?: Connection;
  socketio?: SocketIO;
}

export declare var _global: GLOBAL;