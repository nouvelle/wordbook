module.exports = function(knex) {
  return {
    list: require("./list")(knex)
  };
};
