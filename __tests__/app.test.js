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
  describe("POST", () => {
    test("201: Should add an entry to entries db", () => {
      return request(app)
        .post("/api/entries")
        .send({
          title: "Life of Pi",
          artist: "Yann Martel",
          category: "Book",
          status: "Completed",
          finished: true,
        })
        .expect(201)
        .expect("Content-Type", "application/json; charset=utf-8")
        .then(({ body }) => {
          const { postedEntry } = body;
          expect(postedEntry).toEqual(
            expect.objectContaining({
              id: 13,
              title: "Life of Pi",
              artist: "Yann Martel",
              category: "Book",
              status: "Completed",
              finished: true,
              created_at: expect.any(String),
            })
          );
          return db.query("SELECT COUNT(id) AS entry_count FROM entries;");
        })
        .then(({ rows }) => {
          expect(rows[0].entry_count).toBe("13");
        });
    });
    describe("Error handling", () => {
      test("400: Throws an error when an invalid data type is sent on the request", () => {
        return request(app)
          .post("/api/entries")
          .send({
            title: "Life of Pi",
            artist: "Yann Martel",
            category: "Book",
            status: "Completed",
            finished: "indeed!",
          })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Error 400: Bad request");
          });
      });
      test("400: Throws an error when a request is missing a required field", () => {
        return request(app)
          .post("/api/entries")
          .send({
            title: "Life of Pi",
          })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe("Error 400: Bad request");
          });
      });
    });
  });
  describe("PATCH", () => {
    test("200: Should update the status of the specified entry", () => {
      return request(app)
        .patch("/api/entries/1")
        .send({
          status: "Completed",
        })
        .expect(200)
        .then(({ body }) => {
          const { patchedEntry } = body;
          expect(patchedEntry).toEqual(
            expect.objectContaining({
              id: 1,
              title: "Mordew",
              artist: "Alex Pheby",
              category: "Book",
              status: "Completed",
              finished: true,
              created_at: expect.any(String),
            })
          );
        });
    });
  });
});
