import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchProductsRequest } from './../../actions/productActions';
import styled from 'styled-components';

const ProductGrid = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;

  @media screen and (min-width: 460px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  @supports (display: grid) {
  }
`;

const ProductGridItem = styled.div`
  flex: 0 0 100%;
  max-width: 100%;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  padding: 1rem;

  @media screen and (min-width: 460px) {
    flex: 0 0 40%;
    max-width: 40%;
  }

  @media screen and (min-width: 768px) {
    flex: 0 0 27%;
    max-width: 27%;
  }

  @media screen and (min-width: 1200px) {
    flex: 0 0 21%;
    max-width: 21%;
    justify-content: space-between;
  }

  img {
    max-width: 100%;
    height: auto;
    margin-bottom: 1rem;
  }

  p {
    text-align: center;
    margin-bottom: 1rem;
  }
`;

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
        <ProductGrid>
          {this.props.products.map((product, i) => (
            <ProductGridItem key={product.id}>
              <img
                src={`http://via.placeholder.com/200x200?text=Product+no.${
                  product.id
                }`}
                alt="placeholder"
              />
              <p key={i}>{product.joke}</p>
              <Link to={`product/${product.id}`}>
                Product #{product.id} details
              </Link>
            </ProductGridItem>
          ))}
        </ProductGrid>
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
