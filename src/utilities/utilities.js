export const updateObject = (oldObject, newValues) => {
  // Encapsulate the idea of passing a new object as the first parameter
  // to Object.assign to ensure we correctly copy data instead of mutating
  return Object.assign({}, oldObject, newValues);
};

export const mapArrayIntoObject = arr => {
  return arr.reduce((acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  }, {});
};

export const getIdFromUrl = url => {
  // prettier-ignore
  var re = /\/(\d+)/i;
  var found = url.match(re);
  if (found.length >= 1) {
    return parseInt(found[1], 10);
  }

  return parseInt(found[0], 10);
};

export const createIdKey = obj => {
  if (!('url' in obj)) return { ...obj };

  return {
    ...obj,
    id: getIdFromUrl(obj.url)
  };
};

export const removeFromArray = (array, element) => {
  return array.filter(e => e !== element);
};
