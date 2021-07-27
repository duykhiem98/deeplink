/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import RegisterComponent from '../../screens/register';
import { register } from '../../redux/actions/authen';

class Register extends PureComponent {
  render() {
    return (
      <>
        <RegisterComponent {...this.props} />
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

export default connect(mapStateToProps, mapDispathToProps)(Register);
