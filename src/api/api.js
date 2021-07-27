/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import { Config } from '../config';
import { _global } from '../core/global';
import querystring from 'querystring';
import NavigationService from '../navigation/NavigationService';
const message_timeout = 'Có lỗi xảy ra.';
export const TIMEOUT_SECOND = 15000;

export function GET(url, data, token, option) {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : undefined
  }

  if (!token) {
    delete headers['Authorization'];
  }

  let params = url;
  if (data) {
    params += '?';
    let i = 0;
    for (const key in data) {
      if (data[key] !== undefined)
        if (i != 0) params += `&${key}=${data[key]}`;
        else params += `${key}=${data[key]}`;
      i++;
    }
  }
  console.log('GET::', `${Config.BASE_API}${url}`, params, data, token, option);

  const { timeout, dontShowLoading, dontShowNotifi } = option || {};

  return new Promise((resolve, reject) => {
    Promise.race([
      new Promise((resl, rej) => {
        setTimeout(resl, timeout || TIMEOUT_SECOND, {
          _isTimeOut: true, statusCode: 597
        });
      }),
      fetch(`${Config.BASE_API}${params}`, {
        headers,
        method: 'GET',
      }).then(res => {
        if (res.ok) {
          if (res.status !== 200 && res.status !== 201 && res.status !== 204) {
            return res.message || res.error;
          } else {
            return res.json();
          }
        } else {
          console.log('GET::res::xxx', res, url);
          // if (res.status === 401) {
          //   setTimeout(() => {
          //     _global.Alert.alert({
          //       title: 'Thông báo',
          //       message: 'Bạn vui lòng đăng nhập để thực hiện chức năng này',
          //       leftButton: { text: 'Huỷ' },
          //       rightButton: { text: 'Đăng nhập', onPress: () => NavigationService.reset('authenStack') }
          //     });
          //   }, 100);
          // } else {
          //   return res.text();
          // }
        }
      })])
      .then((json) => {
        console.log('GET::res::', url, json);

        if (json && !json._isTimeOut)
          resolve(json);
        else
          resolve({
            success: false,
            message: message_timeout,
            code: 597
          });
      }).catch(error => {
        // console.log('error', error)
        reject(error);
      })
  });
}

export function POST(url, data, token, option, formData) {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : undefined
  }

  if (!token) {
    delete headers['Authorization'];
  }

  //process for formData
  if (formData) {
    headers['Content-Type'] = 'multipart/form-data';
  }

  console.log('POST::req', `${Config.BASE_API}${url}`, JSON.stringify(data), token, option, formData);
  const { timeout, dontShowLoading, dontShowNotifi } = option || {};

  return new Promise((resolve, reject) => {
    Promise.race([new Promise((resl, rej) => {
      setTimeout(resl, timeout || TIMEOUT_SECOND, {
        _isTimeOut: true, statusCode: 597
      });
    }), fetch(`${Config.BASE_API}${url}`, {
      headers,
      method: 'POST',
      body: formData ? formData : JSON.stringify(data),
    }).then(res => {
      console.log('POST::res::', `${Config.BASE_API}${url}`, res);
      if (res.ok) {
        if (res.status !== 200 && res.status !== 201 && res.status !== 204) {
          return res.message || res.error;
        } else if (res.status === 201 || res.status === 204) {
          return true;
        } else {
          return res.json();
        }
      } else {
        console.log(`post 401`);
        if (res.status === 401) {
          setTimeout(() => {
            _global.Alert.alert({
              title: 'Thông báo',
              message: 'Bạn vui lòng đăng nhập để thực hiện chức năng này',
              leftButton: { text: 'Huỷ' },
              rightButton: { text: 'Đăng nhập', onPress: () => NavigationService.reset('authenStack') }
            });
          }, 100);
          reject();
        } else {
          return res.text();
        }
      }
    })])
      .then((json) => {
        // console.log('POST::res::', `${Config.BASE_API}${url}`, json);
        if (json && !json._isTimeOut)
          resolve(json);
        else
          resolve({
            success: false,
            message: message_timeout,
            statusCode: 597
          });
      }).catch(error => {
        // console.log('error', error)
        reject(error);
      })

  });
}

export function PUT(url, data, token, option) {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : undefined
  }

  if (!token) {
    delete headers['Authorization'];
  }
  console.log('PUT::', `${Config.BASE_API}${url}`, data);
  const { timeout, dontShowLoading, dontShowNotifi } = option || {};

  return new Promise((resolve, reject) => {
    Promise.race([new Promise((resl, rej) => {
      setTimeout(resl, timeout || TIMEOUT_SECOND, {
        _isTimeOut: true, statusCode: 597
      });
    }), fetch(`${Config.BASE_API}${url}`, {
      headers,
      method: 'PUT',
      body: JSON.stringify(data),
    })
      .then(res => {
        console.log(`res:`, res);
        if (res.ok) {
          if (res.status !== 200 && res.status !== 201 && res.status !== 204) {
            return res.message || res.error;
          } else {
            return true;
            // return res.json();
          }
        } else {
          if (res.status === 401) {
            setTimeout(() => {
              _global.Alert.alert({
                title: 'Thông báo',
                message: 'Bạn vui lòng đăng nhập để thực hiện chức năng này',
                leftButton: { text: 'Huỷ' },
                rightButton: { text: 'Đăng nhập', onPress: () => NavigationService.reset('authenStack') }
              });
            }, 100);
          } else {
            return res.text();
          }
        }
      })])
      .then((json) => {
        // console.log('PUT::res::', `${Config.BASE_API}${url}`, json);
        if (json && !json._isTimeOut)
          resolve(json);
        else
          resolve({
            success: false,
            message: message_timeout,
            statusCode: 597
          });
      }).catch(error => {
        // console.log('error', error)
        reject(error);
      })
  });
}

export function DELETE(url, data, token, option) {
  let headers = {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : undefined
  }

  if (!token) {
    delete headers['Authorization'];
  }
  console.log('DELETE::', `${Config.BASE_API}${url}`, data);
  const { timeout, dontShowLoading, dontShowNotifi } = option || {};

  return new Promise((resolve, reject) => {
    Promise.race([new Promise((resl, rej) => {
      setTimeout(resl, timeout || TIMEOUT_SECOND, {
        _isTimeOut: true, statusCode: 597
      });
    }), fetch(`${Config.BASE_API}${url}`, {
      headers,
      method: 'DELETE',
      body: JSON.stringify(data),
    })
      .then(res => {
        console.log(`res:`, res);
        if (res.ok) {
          if (res.status !== 200 && res.status !== 201 && res.status !== 204) {
            return res.message || res.error;
          } else if (res.status === 201 || res.status === 204) {
            return true;
          } else {
            return res.json();
          }
        } else {
          if (res.status === 401) {
            setTimeout(() => {
              _global.Alert.alert({
                title: 'Thông báo',
                message: 'Bạn vui lòng đăng nhập để thực hiện chức năng này',
                leftButton: { text: 'Huỷ' },
                rightButton: { text: 'Đăng nhập', onPress: () => NavigationService.reset('authenStack') }
              });
            }, 100);
          } else {
            return res.text();
          }
        }
      })])
      .then((json) => {
        // console.log('DELETE::res::', `${Config.BASE_API}${url}`, json);
        if (json && !json._isTimeOut)
          resolve(json);
        else
          resolve({
            success: false,
            message: message_timeout,
            statusCode: 597
          });
      }).catch(error => {
        // console.log('error', error)
        reject(error);
      })
  });
}
