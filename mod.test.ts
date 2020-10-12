import { assert, equal } from "https://deno.land/std@0.74.0/testing/asserts.ts";
import { getPort, randomPort, makeRange } from "./mod.ts";

Deno.test("- randomPort without params -", async () => {
  const port = await randomPort({}).catch((error: Error) => { throw error; });
  assert(typeof port === 'number');
});

Deno.test("- randomPort with hostname param -", async () => {
  const port = await randomPort({ hostname: 'localhost' }).catch((error: Error) => { throw error; });
  assert(typeof port === 'number');
});

Deno.test("- getPort without params -", async () => {
  const port = await getPort({}).catch((error: Error) => { throw error; });
  assert(typeof port === 'number');
});

Deno.test("- getPort with port param -", async () => {
  const port = await getPort({ port: 3000 }).catch((error: Error) => { throw error; });
  assert(typeof port === 'number');
});

Deno.test("- getPort with port array param -", async () => {
  const port = await getPort({ port: [3000, 3001, 3002, 3003, 3004, 3005] }).catch((error: Error) => { throw error; });
  assert(typeof port === 'number');
});

Deno.test("- getPort with hostname param -", async () => {
  const port = await getPort({ hostname: 'localhost' }).catch((error: Error) => { throw error; });
  assert(typeof port === 'number');
});

Deno.test("- makeRange -", () => {
  const ports = makeRange(3000, 3100);
  assert(typeof ports === 'object');
});

Deno.test("- getPort with range port param -", async () => {
  const port = await getPort({ port: makeRange(3000, 3100) }).catch((error: Error) => { throw error; });
  assert(typeof port === 'number');
});

