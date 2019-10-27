exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("voca")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("voca").insert([
        {
          english: "apple",
          japanese: "りんご",
          sentence: "I have an apple.",
          memo: "apple🍎"
        },
        {
          english: "banana",
          japanese: "バナナ",
          sentence: "I ate a banana.",
          memo: "banana🍌"
        }
      ]);
    });
};
