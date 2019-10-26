/* eslint-disable no-console */
const { expect, assert } = require("chai");
const config = require("../config");
const knex = require("knex")(config.db);
const models = require("../models")(knex);

const forcePromiseReject = () => {
  throw new Error("This promise should have failed, but did not.");
};

describe("voca", () => {
  describe("setup", () => {
    it("able to connect to database", () =>
      knex
        .raw("select 1+1 as result")
        .catch(() => assert.fail("unable to connect to db")));

    it("has run the initial migrations", () =>
      knex("voca")
        .select()
        .catch(() => assert.fail("voca table is not found.")));
  });

  describe.skip("#create", () => {
    let params = { username: "" };

    context("when bad params are given", () => {
      before(() => {
        params = { username: " " };
      });

      it("politely refuses", () =>
        models.users
          .create(params)
          .then(forcePromiseReject)
          .catch(err =>
            expect(err.message).to.equal(
              "Username must be provided, and be at least two characters"
            )
          ));
    });

    context("when good params are given", () => {
      before(() => {
        params.username = "rp-3";
      });

      afterEach(() => knex("users").del()); // delete all users after each spec

      it("creates a user", () =>
        models.users.create(params).then(user => {
          expect(user).to.include({ username: params.username });
          expect(user.id).to.be.a("number");
        }));

      context("when a duplicate username is provided", () => {
        beforeEach(() => models.users.create(params));

        it("generates a sanitized error message", () =>
          models.users
            .create(params)
            .then(forcePromiseReject)
            .catch(err =>
              expect(err.message).to.equal("That username already exists")
            ));
      });
    });
  });
  describe.skip("#list", () => {
    // const vocaEng = ["hello", "goobye"];
    // const users = usernames.map(username => ({ username }));
    // before(() => Promise.all(users.map(models.users.create)));
    // after(() => knex("users").del());
    // it("lists all vocabulary", () =>
    //   models.users.list().then(resp => {
    //     expect(usernames).to.include(resp[0].username);
    //     expect(usernames).to.include(resp[1].username);
    //   }));
    // it("returns serializable objects", () =>
    //   models.users.list().then(resp => {
    //     expect(resp[0].serialize).to.be.a("function");
    //     expect(resp[0].serialize().id).to.be.a("number");
    //     expect(resp[0].serialize().username).to.be.a("string");
    //   }));
  });
});
