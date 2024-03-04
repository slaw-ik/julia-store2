export const prettifyDate = (date) => {
  const dateObj = new Date(date);
  return dateObj.toLocaleDateString('ru-RU');
};
