exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("voca")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("voca").insert([
        {
          english: "autonomy",
          japanese: "自主・自律・自立",
          sentence:
            "A good boss will provide her workers with the autonomy necessary to create their own ideal working conditions.",
          memo:
            "the capacity of an agent to act in accordance with objective morality rather than under the influence of desires."
        },
        {
          english: "consistent",
          japanese: "一貫した",
          sentence: "She’s the team’s most consistent player.",
          memo:
            "always behaving in the same way or having the same attitudes, standards etc"
        }
      ]);
    });
};
