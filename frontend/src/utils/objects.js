export const camelToSnake = (obj) => {
  if (typeof obj !== 'object' || obj === null) {
    return obj; // Base case: return non-objects or null as is
  }

  if (Array.isArray(obj)) {
    // If obj is an array, recursively call camelToSnake on each element
    return obj.map(camelToSnake);
  }

  // If obj is an object, transform keys to snake case and recursively call camelToSnake on values
  return Object.keys(obj).reduce((acc, key) => {
    const snakeKey = key.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`);
    acc[snakeKey] = camelToSnake(obj[key]);
    return acc;
  }, {});
};

export const rejectNullValuesDeep = (data) => {
  if (Array.isArray(data)) {
    // If data is an array, recursively process each element
    return data
      .map((item) => rejectNullValuesDeep(item)) // Recursively process each element
      .filter((item) => item !== null); // Filter out null values
  } else if (typeof data === 'object' && data !== null) {
    // If data is an object, recursively process each value
    return Object.fromEntries(
      Object.entries(data)
        .map(([key, value]) => [key, rejectNullValuesDeep(value)]) // Recursively process each value
        .filter(([, value]) => value !== null) // Filter out null values
    );
  } else {
    // Return data if it's not an array or object or it's null
    return data;
  }
};
