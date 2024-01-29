export const urlHashParam = (name) => {
  const hash = window.location.hash;
  const hashWithoutHashSign = hash.slice(1);
  const params = new URLSearchParams(hashWithoutHashSign);
  return params.get(name);
};
