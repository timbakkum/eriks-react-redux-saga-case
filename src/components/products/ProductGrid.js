import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Card from './../common/Card';
import config from './../../config';

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

const ProductCardImage = styled.img`
  cursor: pointer;
`;

const renderProducts = (products, transitionToDetail) => {
  return Object.keys(products).map((key, i) => (
    <Card key={products[key].name}>
      <ProductCardImage
        src={`${config.productSpriteUrl}${products[key].id}.png`}
        alt={products[key].name}
        onClick={transitionToDetail.bind(null, products[key].id)}
      />
      <p key={i}>{`Product #${products[key].id}: ${products[key].name}`}</p>
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
  products: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string
  }),
  transitionToDetail: PropTypes.func.isRequired
};

export default ProductGrid;
