/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import InputPasswordComponent from '../../screens/register/InputPassword';
import { register, resetPassword } from '../../redux/actions/authen';

class InputPassword extends PureComponent {
  render() {
    return (
      <>
        <InputPasswordComponent {...this.props} />
      </>
    )
  }
}

const mapDispathToProps = {
  register,
  resetPassword
}

const mapStateToProps = (state, props) => {
  const params = props.navigation.state.params;
  return {
    ...params,
  }
}

export default connect(mapStateToProps, mapDispathToProps)(InputPassword);
