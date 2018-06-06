import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  fetchProductRequest,
  resetDetailStartingStyles
} from './../../actions/productActions';
import { getProductFromArrayById } from './../../selectors/selectors';
import Product from './Product';
import PropTypes from 'prop-types';

class ProductDetail extends Component {
  componentDidMount() {
    const { id } = this.props.match.params;

    if (!this.selectProduct()) {
      this.props.getProductData(id);
    }
  }

  selectProduct = () => {
    const { id } = this.props.match.params;
    return getProductFromArrayById(this.props.products, parseInt(id, 10));
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
        />
      );
    }
  };

  render() {
    const product = this.selectProduct();

    return <div>{this.renderProduct(product)}</div>;
  }
}

function mapStateToProps(state) {
  return {
    products: state.products.data,
    detailStartingStyles: state.products.detailStartingStyles
  };
}

ProductDetail.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      joke: PropTypes.string.isRequired,
      categories: PropTypes.arrayOf(PropTypes.string)
    })
  ),
  getProductData: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  getProductData: fetchProductRequest,
  resetDetailStartingStyles
})(ProductDetail);
