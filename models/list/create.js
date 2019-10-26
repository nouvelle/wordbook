// insert into voca ("english") values ('apple');
const validateEnglish = eng =>
  typeof eng === "string" && eng.replace(" ", "").length < 31;

module.exports = (knex, List) => {
  return params => {
    console.log(params);
    const eng = params.english;
    const ja = params.japanese;
    const sentence = params.sentence;
    const memo = params.memo;
    if (!validateEnglish(eng)) {
      return Promise.reject(
        new Error("English word must be provided, and be at most 30 characters")
      );
    }

    return knex("voca")
      .insert({
        english: eng,
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
          .select();
      })
      .then(voca => new List(voca.pop())) // create a list model out of the plain database response
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
