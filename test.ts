import { assert } from "https://deno.land/std@0.74.0/testing/asserts.ts";
import { min, max, getPort, randomPort, makeRange } from "./mod.ts";

class ServerTest {
  server: Deno.Listener<Deno.NetAddr>;
  n: number;
  port: number;
  constructor(n: number, port: number) {
    this.n = n;
    this.port = port;
    this.server = Deno.listen({ port });
    console.log(`Server test ${n} listen on ${port}`);
    this.listen().then();
  }
  async listen() {
    for await (const req of this.server) {
      //...
    }
  }
  close() {
    this.server.close();
    console.log(`Server test ${this.n} on ${this.port} stopped`);
  }
}

new ServerTest(0, 3000);

Deno.test("randomPort without params", () => {
  const port = randomPort();
  console.log("returned:", port);
  console.log(`Is a number (${(typeof port === "number")}) and is includes between ${min} (${(port > min)}) and ${max} (${(port < max)})`);
  assert(typeof port === "number" && (port > min && port < max));
});

Deno.test("randomPort with hostname param", () => {
  const port =  randomPort("localhost");
  console.log("returned: ", port);
  console.log(`Is a number (${(typeof port === "number")}) and is includes between ${min} (${(port > min)}) and ${max} (${(port < max)})`);
  assert(typeof port === "number" && port > min && port < max);
});

Deno.test("getPort without params", () => {
  const port = getPort();
  console.log("returned: ", port);
  console.log(`Is a number (${(typeof port === "number")}) and is includes between ${min} (${port > min}) and ${max} (${(port > min)})`);
  assert(typeof port === "number" && port > min && port < max);
});

Deno.test("getPort with port param", () => {
  const port =  getPort(3000);
  console.log("returned: ", port);
  console.log(`Is a number (${(typeof port === "number")}) and is equal at 3001 (${(port === 3001)}) because port 3000 is used in this test.`);
  assert(typeof port === "number" && port === 3001);
});

Deno.test("getPort with port array param", () => {
  const port =  getPort([3000, 3001, 3002, 3003, 3004, 3005]);
  console.log("returned: ", port);
  console.log(`Is a number (${(typeof port === "number")}) and is equal at 3001 (${(port === 3001)}) because port 3000 is used in this test.`);
  assert(typeof port === "number" && port === 3001);
});

Deno.test("getPort with hostname param",  () => {
  const port =  getPort(undefined, "localhost");
  console.log("returned: ", port);
  console.log(`Is a number (${(typeof port === "number")}) and is includes between ${min} (${(port > min)}) and ${max} (${(port < max)})`);
  assert(typeof port === "number" && port > min && port < max);
});

Deno.test("makeRange", () => {
  const ports = makeRange(3000, 3100);
  console.log("returned: range ", ports[0], ports[ports.length-1]);
  let numbers = true;
  for(const n of ports) {
    if (typeof n !== "number" && !(n > min && n < max)) numbers = false;
  }
  console.log(`Is a array (${(typeof ports === "object")}) of number and all items in array is numbers and is includes between ${min} and ${max} (${(numbers === true)}).`);
  assert(typeof ports === "object" && numbers === true);
});

Deno.test("getPort with range port param",  () => {
  const port =  getPort(makeRange(3000, 3100));
  console.log("returned: ", port);
  console.log(`Is a number (${(typeof port === "number")}) and is includes between ${min} (${(port > min)}) and ${max} (${(port < max)}).`);
  assert(typeof port === "number" && port > min && port < max);
});