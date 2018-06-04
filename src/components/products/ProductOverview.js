import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class ProductOverview extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Product overview</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state
  };
}

export default connect(mapStateToProps)(ProductOverview);
