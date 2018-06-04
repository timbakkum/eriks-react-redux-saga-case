import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import {
  fetchProductsRequest,
  setDetailStartingStyles
} from './../../actions/productActions';
import Loader from 'react-loaders';
import styled from 'styled-components';

const Card = styled.div`
  flex: 0 0 100%;
  max-width: 100%;
  margin-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
  border-radius: 2px;
  background: white;
  border: none;
  padding: 1rem;

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

const Button = styled.button`
  background-color: #0163af;
  appearance: none;
  border: none;
  box-shadow: none;
  border-radius: 2px;
  color: white;
  cursor: pointer;
  line-height: 2.5rem;
  font-size: 1rem;
  padding: 0.25rem 1rem;
  font-weight: bold;
`;

const ProductGrid = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;

  @media screen and (min-width: 460px) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  @media screen and (min-width: 1200px) {
    justify-content: space-between;
  }

  ${Card} {
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
    }
  }
`;

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
    const y = event.currentTarget.offsetTop - window.scrollY;
    const styles = { x, y };

    this.props.setDetailStartingStyles(styles);
    this.props.push(`/product/${id}`);
  }

  render() {
    return (
      <div>
        <h1>Product overview</h1>
        {this.props.loading ? (
          <Loader type="square-spin" color="#1a5ca3" active />
        ) : (
          <ProductGrid>
            {this.props.products.map((product, i) => (
              <Card key={product.id}>
                <img
                  src={`http://via.placeholder.com/200x200?text=Product+no.${
                    product.id
                  }`}
                  alt="placeholder"
                />
                <p key={i}>{product.joke}</p>

                <Button
                  onClick={this.transitionToDetail.bind(this, product.id)}
                >
                  Product #{product.id} details
                </Button>
              </Card>
            ))}
          </ProductGrid>
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

export default withRouter(
  connect(mapStateToProps, {
    getProductsData: fetchProductsRequest,
    setDetailStartingStyles,
    push
  })(ProductOverview)
);
