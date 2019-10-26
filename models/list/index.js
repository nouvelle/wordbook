const moment = require("moment");

const List = function(dbUser) {
  this.id = dbUser.id;
  this.english = dbUser.english;
  this.japanese = dbUser.japanese;
  this.sentence = dbUser.sentence;
  this.memo = dbUser.memo;
  this.createdAt = new Date(dbUser.created_at);
};

List.prototype.serialize = function() {
  // we use a serializer to format the object and
  // clean out any information that shouldn't be
  // sent to the client, like passwords, for example.
  return {
    id: this.id,
    english: this.english,
    japanese: this.japanese,
    sentence: this.sentence,
    memo: this.memo,
    createdAt: moment(this.createdAt).format("hh:mm:ss")
  };
};

module.exports = knex => {
  return {
    // create: require("./create")(knex, List),
    list: require("./list")(knex, List)
    // get: require("./get")(knex, List)
  };
};
