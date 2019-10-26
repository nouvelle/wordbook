const validateEnglish = eng =>
  typeof eng === "string" && eng.replace(" ", "").length < 31;

module.exports = (knex, List) => {
  return params => {
    const eng = params.english;
    let ja = "";
    let sentence = "";
    let memo = "";
    if (params.japanese) ja = params.japanese;
    if (params.sentence) sentence = params.sentence;
    if (params.memo) memo = params.memo;
    if (!validateEnglish(eng)) {
      return Promise.reject(
        new Error("English word must be provided, and be at most 30 characters")
      );
    }

    return knex("voca")
      .where("english", "=", eng)
      .update({
        japanese: ja,
        sentence: sentence,
        memo: memo
      })
      .then(() => {
        return knex("voca")
          .where({
            english: eng,
            japanese: ja,
            sentence: sentence,
            memo: memo
          })
          .select()
          .then(voca => new List(voca[0]));
      })
      .catch(err => {
        // sanitize known errors
        if (
          err.message.match("duplicate key value") ||
          err.message.match("UNIQUE constraint failed")
        )
          return Promise.reject(new Error("That english word already exists"));

        // throw unknown errors
        return Promise.reject(err);
      });
  };
};
