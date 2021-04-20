# getport [![Build Status](https://travis-ci.com/devartsite/getport.svg?branch=master)](https://travis-ci.com/devartsite/getport)

> Get an available [TCP port](https://en.wikipedia.org/wiki/Port_(computer_networking))

## Usage

```ts
import { getPort, randomPort, makeRange } from "https://deno.land/x/getport/mod.ts";
```

```shell
deno run --allow-net script.ts
```

## Example

- Without params

    ```ts
    import { getPort } from "https://deno.land/x/getport/mod.ts";

    const port = getPort();

    console.log(port); //=> Return first port available between 1024 and 65535
    ```

- Pass in a preferred port:

    ```ts
    import { getPort } from "https://deno.land/x/getport/mod.ts";

    const port = await getPort(3000);

    console.log(port); //=> Will use 3000 if available, otherwise returns the port plus one
    ```

- Pass in an array of preferred ports:

    ```ts
    import { getPort } from "https://deno.land/x/getport/mod.ts";

    const port = await getPort({ port: [3000, 3001, 3002] });

    console.log(port); //=> Will use once element in the preferred ports array if available, otherwise returns the last port in array plus one
    ```

- Use the `makeRange()` helper in case you need a port in a certain range:

    ```ts
    import { getPort, randomPort, makeRange } from "https://deno.land/x/getport/mod.ts";

    const range = makeRange(3000, 3100);

    console.log(range); //=> Return [3000, 3002, ..., 3099, 3100]

    const port = await getPort(range);

    console.log(port); //=> Will use first available port between 3000 and 3100
    ```

## API

- ### getPort

  - @param port [Port](###Port)
  - @param hostname [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  - @return [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

    ```ts
    /**
     * Get all steam applications data.
     * @param {Format?} format
     * @return {Output}
     */
    const port = getPort();
    ```

- ### makeRange

  - @param from [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - @param to [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
  - @return [Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

    ```ts
    /**
     * Create an array of number by min and max.
     * @param {number} from Must be between 1024 and 65535
     * @param {number} to Must be between 1024 and 65535 and greater than from
     * @return {number[]}
     */
    const port = makeRange();
    ```

- ### randomPort

  - @param hostname [String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
  - @return [Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)

    ```ts
    /**
     * Return a random port between 1024 and 65535.
     * @param {string?} hostname
     * @return {number}
     */
    const port = randomPort();
    ```

## TypeDef

- ### Format

    ```ts
    type Port = number | number[];
    ```

## Test

```shell
Server test 0 listen on 3000
running 8 tests
test randomPort without params ... returned: 25645
Is a number (true) and is includes between 1024 (true) and 65535 (true)
ok (9ms)
test randomPort with hostname param ... returned:  19788
Is a number (true) and is includes between 1024 (true) and 65535 (true)
ok (15ms)
test getPort without params ... returned:  1025
Is a number (true) and is includes between 1024 (true) and 65535 (true)
ok (15ms)
test getPort with port param ... returned:  3001
Is a number (true) and is equal at 3001 (true) because port 3000 is used in this test.
ok (16ms)
test getPort with port array param ... returned:  3001
Is a number (true) and is equal at 3001 (true) because port 3000 is used in this test.
ok (16ms)
test getPort with hostname param ... returned:  1025
Is a number (true) and is includes between 1024 (true) and 65535 (true)
ok (16ms)
test makeRange ... returned: range  3000 3100
Is a array (true) of number and all items in array is numbers and is includes between 1024 and 65535 (true).
ok (16ms)
test getPort with range port param ... returned:  3001
Is a number (true) and is includes between 1024 (true) and 65535 (true).
ok (15ms)

test result: ok. 8 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out (120ms)
```
