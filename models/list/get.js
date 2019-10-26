module.exports = (knex, List) => {
  return params => {
    const eng = params.english;

    return knex("voca")
      .where({ english: eng })
      .select()
      .then(voca => {
        if (voca.length) return new List(voca.pop());

        throw new Error(`Error finding word ${eng}`);
      });
  };
};
