import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProductRequest } from './../../actions/productActions';
import { getProductFromArrayById } from './../../selectors/selectors';
import PropTypes from 'prop-types';

class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.selectProduct = this.selectProduct.bind(this);
    this.renderProduct = this.renderProduct.bind(this);
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    if (!this.selectProduct()) {
      this.props.getProductData(id);
    }
  }

  selectProduct() {
    const { id } = this.props.match.params;
    return getProductFromArrayById(this.props.products, parseInt(id, 10));
  }

  renderProduct(product) {
    if (!product) {
      return <p>Product niet gevonden!</p>;
    } else {
      return (
        <div>
          <img
            src={`http://via.placeholder.com/200x200?text=Product+no.${
              product.id
            }`}
            alt="placeholder"
          />
          <h2>{`Product no. ${product.id}`}</h2>
          <p>{product.joke}</p>
          <h6>categoriën: </h6>
          {product.categories.length
            ? product.categories.map(cat => cat)
            : 'Geen categoriën'}
        </div>
      );
    }
  }

  render() {
    const product = this.selectProduct();

    return (
      <div>
        <h1>Product detail</h1>
        {this.renderProduct(product)}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    products: state.products.data
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
  getProductData: fetchProductRequest
})(ProductDetail);
