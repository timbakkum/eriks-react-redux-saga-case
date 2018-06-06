import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  fetchProductsRequest,
  setDetailStartingStyles
} from './../../actions/productActions';
import Loader from 'react-loaders';
import ProductGrid from './ProductGrid';

class ProductOverview extends Component {
  componentDidMount() {
    if (this.props.productOrder < 151) {
      console.log('fetching more products');
      // fetch products if no cached products are present
      this.props.getProductsData();
    }
  }

  transitionToDetail = (id, event) => {
    if (!id) {
      return;
    }

    const x = event.currentTarget.offsetLeft;

    // the 64 px is the height of the navigation bar
    // this should be a variable/constant in an ideal world
    // that gets used by both this function and the styled components
    const y = event.currentTarget.offsetTop - window.scrollY - 64;
    const styles = { x, y };

    this.props.setDetailStartingStyles(styles);
    this.props.history.push(`/product/${id}`);
  };

  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Product overview</h1>
        {this.props.loading ? (
          <Loader type="square-spin" color="#1a5ca3" active />
        ) : (
          <ProductGrid
            products={this.props.productsData}
            order={this.props.productOrder}
            transitionToDetail={this.transitionToDetail}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    productsData: state.products.byId,
    productOrder: state.products.allIds,
    loading: state.products.overviewLoading
  };
}

ProductOverview.propTypes = {
  productsData: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    url: PropTypes.string
  }).isRequired,
  productOrder: PropTypes.array.isRequired,
  getProductsData: PropTypes.func.isRequired,
  setDetailStartingStyles: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  getProductsData: fetchProductsRequest,
  setDetailStartingStyles
})(ProductOverview);
