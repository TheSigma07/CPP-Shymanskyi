import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "../server.js";

test("Сервер віддає index.html та блокує заборонені файли", async () => {
    const server = createServer();
    await new Promise(resolve => server.listen(0, resolve));
    const port = server.address().port;

    const okRes = await fetch(`http://localhost:${port}/`);
    assert.equal(okRes.status, 200);

    const forbiddenRes = await fetch(`http://localhost:${port}/package.json`);
    assert.equal(forbiddenRes.status, 404);

    server.close();
});