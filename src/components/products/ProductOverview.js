import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchProductsRequest } from './../../actions/productActions';

class ProductOverview extends Component {
  componentDidMount() {
    if (this.props.products.length <= 0) {
      // fetch products if no cached products are present
      this.props.getProductsData();
    }
  }

  render() {
    return (
      <div>
        <h1>Product overview</h1>
        {this.props.products.map((product, i) => (
          <div key={product.id}>
            <img
              src={`http://via.placeholder.com/200x200?text=Product+no.${
                product.id
              }`}
              alt="placeholder"
            />
            <h4 key={i}>{product.joke}</h4>
            <Link to={`product/${product.id}`}>
              Product #{product.id} details
            </Link>
          </div>
        ))}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products
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
  getProductsData: fetchProductsRequest
})(ProductOverview);
