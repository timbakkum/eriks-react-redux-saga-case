import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Motion, spring } from 'react-motion';

const ProductImage = styled.img`
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  position: absolute;
  z-index: 10;
`;

class ProductImageAnimation extends React.Component {
  render() {
    const { x, y, image } = this.props;

    // the constants below should be in a global config file
    const endingX = 10;
    const endingY = 50;

    return (
      <Motion
        defaultStyle={{
          x,
          y
        }}
        style={{
          x: spring(endingX),
          y: spring(endingY)
        }}
        onRest={this.props.animationCallback}
      >
        {interpolatingStyle => (
          <ProductImage
            x={interpolatingStyle.x}
            y={interpolatingStyle.y}
            src={image}
          />
        )}
      </Motion>
    );
  }
}

ProductImageAnimation.propTypes = {
  image: PropTypes.string.isRequired,
  animationCallback: PropTypes.func.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default ProductImageAnimation;
