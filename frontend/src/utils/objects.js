import _ from 'lodash';

export const snakeCaseKeys = (obj) => {
  if (!obj) return obj;
  if (Array.isArray(obj)) return obj.map(snakeCaseKeys);
  if (typeof obj !== 'object') return obj;
  return _.mapKeys(obj, (value, key) => _.snakeCase(key));
};


export const deepSnakeCaseKeys = obj => {
  // Check if obj is null or undefined
  if (obj === null || obj === undefined) {
    return obj;
  }

  // If obj is not a plain object, return it as is
  if (!(obj instanceof Object && obj.constructor === Object)) {
    return obj;
  }

  // If obj is an array, apply deepSnakeCaseKeys to each element
  if (_.isArray(obj)) {
    return obj.map(deepSnakeCaseKeys);
  }

  // Convert object keys to snake case recursively
  return _.mapKeys(obj, (value, key) => {
    if (value instanceof Object && value.constructor === Object) {
      return deepSnakeCaseKeys(value);
    } else {
      return _.snakeCase(key);
    }
  });
};
