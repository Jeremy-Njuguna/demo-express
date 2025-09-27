const request = require("supertest");
const app = require("../src/app");

describe("Express App", () => {
  it("GET /health should return UP", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.body.status).toBe("UP");
  });

  it("POST /auth/login should return token", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ username: "admin", password: "password" });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("GET /api/data should fail without token", async () => {
    const res = await request(app).get("/api/data");
    expect(res.status).toBe(401);
  });
});
