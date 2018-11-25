const filterByProp = (array, prop, filter) => array.filter((obj) => {
  const objectLowercase = obj[prop].toLowerCase();
  const comparedLowercase = filter.toLowerCase();

  return objectLowercase.includes(comparedLowercase);
});

export default filterByProp;
