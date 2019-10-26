module.exports = (knex, List) => {
  return () => {
    return knex("voca")
      .select("id", "english", "japanese", "sentence", "memo", "created_at")
      .then(vocaArray => {
        const output = [];
        if (vocaArray.length > 0)
          vocaArray.forEach(voca => output.push(new List(voca)));
        return output;
      });
  };
};
