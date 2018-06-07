export const getProductFromArrayById = (array, id) => {
  return array.find(product => product.id === id);
};

export const getProductFromObjById = (obj, id) => {
  return obj[id];
};
