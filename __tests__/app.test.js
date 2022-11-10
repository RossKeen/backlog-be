const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data");
const db = require("../db/connection.js");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("/api", () => {
  describe("GET", () => {
    test("200: responds with a list of all endpoints", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual({
            "GET /api": {
              description: "serves up a json representation of all the available endpoints of the api",
            },
          });
        });
    });
  });
  describe("POST", () => {});
  describe("PATCH", () => {});
});
