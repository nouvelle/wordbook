// yarn knex migrate:make add_voca_data --knexfile models/knexfile.js
exports.up = function(knex) {
  // create the 'voca' table with six columns
  return knex("voca").insert({
    english: "apple",
    japanese: "ああ",
    sentence: "I have an apple.",
    memo: "This is memo."
  });
};

exports.down = function(knex) {
  // undo this migration by destroying the 'voca' table
  return knex("voca")
    .where("english", "apple")
    .del();
};

// insert into voca ("english") values ('apple');
// delete from voca where english = 'apple';

// yarn knex migrate:up models/migrations/20191026103628_add_voca_data.js
// yarn knex migrate:down models/migrations/20191026103628_add_voca_data.js
