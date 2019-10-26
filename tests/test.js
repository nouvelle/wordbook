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

  describe("#create", () => {
    let params = { english: "" };

    context("when good params are given", () => {
      before(() => {
        params.english = "japan";
        params.japanese = "日本";
        params.sentence = "I live in Japan.";
        params.memo = "Japan is country.";
      });

      afterEach(() => knex("voca").del()); // delete all voca after each spec

      it("creates a words", () =>
        models.list.create(params).then(voca => {
          expect(voca).to.include({ english: params.english });
          expect(voca).to.include({ japanese: params.japanese });
          expect(voca).to.include({ sentence: params.sentence });
          expect(voca).to.include({ memo: params.memo });
          expect(voca.id).to.be.a("number");
        }));

      context("when a duplicate English word is provided", () => {
        beforeEach(() => models.list.create(params));

        it("generates a sanitized error message", () =>
          models.list
            .create(params)
            .then(forcePromiseReject)
            .catch(err =>
              expect(err.message).to.equal("That english word already exists")
            ));
      });
    });
  });

  describe("#list", () => {
    before(() =>
      knex("voca")
        .insert([
          {
            english: "japan",
            japanese: "日本",
            sentence: "I live in Japan.",
            memo: "Japan is country."
          },
          {
            english: "tokyo",
            japanese: "東京",
            sentence: "I live in Tokyo.",
            memo: "Tokyo is city."
          }
        ])
        .then(
          () =>
            new Promise(res =>
              setTimeout(() => {
                res();
              }, 500)
            )
        )
    );
    after(() => knex("voca").del());

    it("lists all vocabulary", () =>
      models.list.list().then(resp => {
        expect("japan").to.include(resp[0].english);
        expect("tokyo").to.include(resp[1].english);
      }));
    it("returns serializable objects", () =>
      models.list.list().then(resp => {
        expect(resp[0].serialize).to.be.a("function");
        expect(resp[0].serialize().id).to.be.a("number");
        expect(resp[0].serialize().english).to.be.a("string");
      }));
  });

  describe("#delete", () => {
    before(() =>
      knex("voca")
        .insert([
          {
            english: "japan",
            japanese: "日本",
            sentence: "I live in Japan.",
            memo: "Japan is country."
          }
        ])
        .then(
          () =>
            new Promise(res =>
              setTimeout(() => {
                res();
              }, 500)
            )
        )
    );
    after(() => knex("voca").del()); // delete all voca after each spec

    it("exist a word", () =>
      models.list.list().then(resp => {
        expect("japan").to.include(resp[0].english);
      }));

    it("delete a word", () =>
      models.list.delete({ english: "japan" }).then(resp => {
        expect("japan").to.not.include(resp.english);
      }));
  });

  describe("#modify", () => {
    let params = {};

    before(() =>
      knex("voca")
        .insert([
          {
            english: "japan",
            japanese: "日本",
            sentence: "I live in Japan.",
            memo: "Japan is country."
          }
        ])
        .then(
          () =>
            new Promise(res =>
              setTimeout(() => {
                res();
              }, 500)
            )
        )
    );
    after(() => knex("voca").del()); // delete all voca after each spec

    it("exist a word", () =>
      models.list.list().then(resp => {
        expect("日本").to.include(resp[0].japanese);
      }));
    context("when good params are given", () => {
      const modify = {
        english: "japan",
        japanese: "change: にっぽん",
        sentence: "change: I live in Japan.",
        memo: "change: Japan is country."
      };

      it("modify a words", () =>
        models.list.modify(modify).then(resp => {
          expect("japan").to.include(resp.english);
          expect("change: にっぽん").to.include(resp.japanese);
          expect("change: I live in Japan.").to.include(resp.sentence);
          expect("change: Japan is country.").to.include(resp.memo);
        }));
    });
  });
});
