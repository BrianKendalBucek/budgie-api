const randomNumBetween = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

module.exports = { randomNumBetween };
