export const getProductFromArrayById = (array, id) => {
  return array.find(product => product.id === id);
};
