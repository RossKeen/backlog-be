const request = require("supertest");
const app = require("../app");
const seed = require("../db/seeds/seed");
const testData = require("../db/data/test-data/index.js");
const db = require("../db/connection.js");

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end();
});

describe("404: Resource not found errors", () => {
  test("404: Should respond with an appropriate error message if the user enters a path that does not exist", () => {
    return request(app)
      .get("/api/not_existant_path")
      .expect(404)
      .then(({ body }) => {
        expect(body.msg).toBe("Error 404: Not found");
      });
  });
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
});

describe("/entries", () => {
  describe("GET", () => {
    test("200: responds with a list of all entries", () => {
      return request(app)
        .get("/api/entries")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(({ body }) => {
          const { entries } = body;
          expect(Array.isArray(entries)).toBe(true);
          expect(entries.length === 12).toBe(true);
          entries.forEach((entry) => {
            expect(entry).toEqual(
              expect.objectContaining({
                id: expect.any(Number),
                title: expect.any(String),
                artist: expect.any(String),
                category: expect.any(String),
                status: expect.any(String),
                finished: expect.any(Boolean),
                created_at: expect.any(String),
              })
            );
          });
        });
    });
  });
});
