/**
* Created by bavv on 26/06/2020
* Copyright (c) 2020 bavv
*/

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import BannerDetailComponent from '../../screens/banner-detail';

class BannerDetail extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <BannerDetailComponent {...this.props} />
      </>
    )
  }
}

const mapDispathToProps = {
}

const mapStateToProps = (state, props) => {
  const params = props.navigation.state.params;
  return {
    ...params,
  }
}

export default connect(mapStateToProps, mapDispathToProps)(BannerDetail);
