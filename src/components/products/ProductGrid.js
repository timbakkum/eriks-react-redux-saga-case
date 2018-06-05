import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from './../common/Card';
import Button from './../common/Button';

const ProductGridWrapper = styled.div`
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

const renderProducts = (products, transitionToDetail) => {
  return products.map((product, i) => (
    <Card key={product.id}>
      <img
        src={`http://via.placeholder.com/200x200?text=Product+no.${product.id}`}
        alt="placeholder"
      />
      <p key={i}>{product.joke}</p>

      <Button onClick={transitionToDetail.bind(null, product.id)}>
        Product #{product.id} details
      </Button>
    </Card>
  ));
};

const ProductGrid = ({ products, transitionToDetail }) => {
  return (
    <ProductGridWrapper>
      {renderProducts(products, transitionToDetail)}
    </ProductGridWrapper>
  );
};

ProductGrid.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      joke: PropTypes.string.isRequired,
      categories: PropTypes.arrayOf(PropTypes.string)
    })
  ),
  transitionToDetail: PropTypes.func.isRequired
};

export default ProductGrid;
