import supertest from "supertest";
import createServer from "../utils/server";

const app = createServer();

describe("user", () => {
  describe("get user route", () => {
    describe("given user does not exist", () => {
      const OLD_ENV = process.env;

      beforeEach(() => {
        jest.resetModules(); // Most important - it clears the cache
        process.env = { ...OLD_ENV }; // Make a copy
      });

      afterAll(() => {
        process.env = OLD_ENV; // Restore old environment
      });

      it("should return a 404", async () => {
        // expect(true).toBe(true);
        // Set the variables
        process.env.NODE_ENV = "test";
        process.env.PORT = 3333;
        process.env.DB_NAME = "users_db";
        process.env.DB_PORT = 5432;
        process.env.DB_USER = "postgres";
        process.env.DB_PASSWORD = "332hpRETp";
        process.env.DB_HOST = "localhost";
        process.env.CONNECTION_STRING = "postgres://postgres:332hpRETp@localhost:5432/users_db";
        process.env.SECRET_KEY = "asdasiuf92r92-1_@(29jda9dKlksmlal#r";

        const userId = "testUser1";
        await supertest(app).get(`/api/users/${userId}`).expect(404);
      });
    });
  });
});
