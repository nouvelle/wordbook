module.exports = (knex, List) => {
  return params => {
    const eng = params.english;

    return knex("voca")
      .where("english", eng)
      .del()
      .catch(err => {
        // throw unknown errors
        return Promise.reject(err);
      });
  };
};
