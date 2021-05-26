import { assert } from "https://deno.land/std@0.74.0/testing/asserts.ts";
import { min, max, getPort, randomPort, makeRange } from "./mod.ts";

class ServerTest {
  server: Deno.Listener;
  n: number;
  port: number;
  constructor(n: number, port: number, timeout = 2000) {
    this.n = n;
    this.port = port;
    this.server = Deno.listen({ port });
    console.log(`Server test ${n} listen on ${port}`);
    this.listen().then();
    setTimeout(() => this.server.close(), timeout);
  }
  async listen() {
    for await (const req of this.server) { /**...*/ }
  }
}

new ServerTest(0, 3000);

Deno.test("randomPort without params", () => {
  const port = randomPort();
  assert(typeof port === "number" && (port > min && port < max));
});

Deno.test("randomPort with hostname param", () => {
  const port =  randomPort("localhost");
  assert(typeof port === "number" && port > min && port < max);
});

Deno.test("getPort without params", () => {
  const port = getPort();
  assert(typeof port === "number" && port > min && port < max);
});

Deno.test("getPort with port param", () => {
  const port =  getPort(3000);
  assert(typeof port === "number" && port !== 3000);
});

Deno.test("getPort with port array param", () => {
  const port =  getPort([3000, 3001, 3002, 3003, 3004, 3005]);
  assert(typeof port === "number" && port !== 3000);
});

Deno.test("getPort with hostname param",  () => {
  const port =  getPort(undefined, "localhost");
  assert(typeof port === "number" && port > min && port < max);
});

Deno.test("makeRange", () => {
  const ports = makeRange(3000, 3100);
  let numbers = true;
  for(const n of ports) {
    if (typeof n !== "number" && !(n > min && n < max)) numbers = false;
  }
  assert(typeof ports === "object" && numbers === true);
});

Deno.test("getPort with range port param",  () => {
  const port =  getPort(makeRange(3000, 3100));
  assert(typeof port === "number" && port > min && port < max);
});