module.exports = function parserStringAsArray(arrayAsString) {
  return arrayAsString.split(",").map(item => item.trim());
};
