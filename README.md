# getport [![deno doc](https://doc.deno.land/badge.svg)](https://doc.deno.land/https/deno.land/x/getport/mod.ts)

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
     * Return available port.
     * @param {number | number[]} port
     * @param {string?} hostname
     * @return {number}
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

## Change Logs

See [CHANGELOG.md](CHANGELOG.md)
