import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchProductRequest,
  resetDetailStartingStyles
} from './../../actions/productActions';
import Product from './Product';
import PropTypes from 'prop-types';

class ProductDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    if (!this.hasProductDetails()) {
      this.props.getProductData(id);
    }
  }

  selectProductDetails = () => {
    const { id } = this.props.match.params;
    return this.props.productsData[id];
  };

  hasProductDetails = () => {
    const { id } = this.props.match.params;
    return this.props.productsData[id] && this.props.productsData[id].details;
  };

  renderProduct = product => {
    if (!product) {
      return <p>Product niet gevonden!</p>;
    } else {
      return (
        <Product
          product={product}
          startingStyles={this.props.detailStartingStyles}
          animationCallback={this.props.resetDetailStartingStyles}
          isLoading={this.props.isLoading}
        />
      );
    }
  };

  render() {
    const product = this.selectProductDetails();
    const isLoading = this.props.isLoading;

    if (!product && isLoading) {
      return <p>Loading...</p>;
    } else {
      return <div>{this.renderProduct(product)}</div>;
    }
  }
}

function mapStateToProps(state) {
  return {
    productsData: state.products.byId,
    detailStartingStyles: state.products.detailStartingStyles,
    isLoading: state.products.detailLoading
  };
}

ProductDetail.propTypes = {
  productsData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    url: PropTypes.string
  }).isRequired,
  isLoading: PropTypes.bool.isRequired,
  detailStartingStyles: PropTypes.object.isRequired,
  resetDetailStartingStyles: PropTypes.func.isRequired,
  getProductData: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  getProductData: fetchProductRequest,
  resetDetailStartingStyles
})(ProductDetail);
