/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import InputOTPComponent from '../../screens/register/InputOTP';
import { register } from '../../redux/actions/authen';

class InputOTP extends PureComponent {
  render() {
    return (
      <>
        <InputOTPComponent {...this.props} />
      </>
    )
  }
}

const mapDispathToProps = {
  register
}

const mapStateToProps = (state, props) => {
  const params = props.navigation.state.params;
  return {
    ...params,
  }
}

export default connect(mapStateToProps, mapDispathToProps)(InputOTP);
