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
  constructor(props) {
    super(props);
    this.transitionToDetail = this.transitionToDetail.bind(this);
  }

  componentDidMount() {
    if (this.props.products.length <= 9) {
      // fetch products if no cached products are present
      this.props.getProductsData();
    }
  }

  transitionToDetail(id, event) {
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
  }

  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Product overview</h1>
        {this.props.loading ? (
          <Loader type="square-spin" color="#1a5ca3" active />
        ) : (
          <ProductGrid
            products={this.props.products}
            transitionToDetail={this.transitionToDetail}
          />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products.data,
    loading: state.products.overviewLoading
  };
}

ProductOverview.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      joke: PropTypes.string.isRequired,
      categories: PropTypes.arrayOf(PropTypes.string)
    })
  ),
  getProductsData: PropTypes.func.isRequired
};

export default connect(mapStateToProps, {
  getProductsData: fetchProductsRequest,
  setDetailStartingStyles
})(ProductOverview);
