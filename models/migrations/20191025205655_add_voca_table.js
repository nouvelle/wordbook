// yarn knex migrate:make add_voca_table --knexfile models/knexfile.js

exports.up = function(knex) {
  // create the 'voca' table with six columns
  return knex.schema.createTable("voca", t => {
    t.increments() // auto-incrementing id column
      .index(); // index this column

    t.string("english", 30) // maximum length of 30 characters
      .unique() // add a unique constraint to this column
      .notNullable() // add a not-null constraint to this column
      .index(); // index it

    t.string("japanese", 30) // maximum length of 30 characters
      .index(); // index it

    t.string("sentence", 300); // maximum length of 300 characters

    t.string("memo", 500); // maximum length of 500 characters

    t.timestamp("created_at")
      .notNullable()
      .defaultTo(knex.fn.now()); // default to the current time
  });
};

exports.down = function(knex) {
  // undo this migration by destroying the 'voca' table
  return knex.schema.dropTable("voca");
};
