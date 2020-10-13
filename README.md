<div align="center">
  <a href="https://devartsite.com/opensource" target="_blank">
    <img src="https://devartsite.com/assets/front/v1/img/logo-longtext.png" width="250px">
    <br>
    <sub><h5>Devartsite helps make open source sustainable.</h5></sub>
  </a>
</div>

# getport [![Build Status](https://travis-ci.org/devartsite/getport.svg?branch=master)](https://travis-ci.org/devartsite/getport)

> Get an available [TCP port](https://en.wikipedia.org/wiki/Port_(computer_networking))

## Usage

```ts
import { getPort } from "https://deno.land/x/getport/mod.ts";

const port = await getPort({}).catch((error: Error) => {
  throw error;
});

console.log(port); //=> fall back to a random port
```

Pass in a preferred port:

```ts
import { getPort } from "https://deno.land/x/getport/mod.ts";

const port = await getPort({ port: 3000 }).catch((error: Error) => {
  throw error;
});

console.log(port); //=> Will use 3000 if available, otherwise fall back to a random port
```

Pass in an array of preferred ports:

```ts
import { getPort } from "https://deno.land/x/getport/mod.ts";

const port = await getPort({ port: [3000, 3001, 3002] }).catch((error: Error) => {
  throw error;
});

console.log(port); //=> Will use any element in the preferred ports array if available, otherwise fall back to a random port
```

Use the `makeRange()` helper in case you need a port in a certain range:

```ts
import { getPort, makeRange } from "https://deno.land/x/getport/mod.ts";

const port = await getPort({ port: makeRange(3000, 3100) }).catch((error: Error) => {
  throw error;
});

console.log(port); //=> Will use any port from 3000 to 3100, otherwise fall back to a random port
```

## API

### getPort(options?)

Returns a `Promise` for a port number.

#### options

Type: `object`

##### port

Type: `number | Iterable<number>`

A preferred port or an iterable of preferred ports to use.

##### hostname

Type: `string`

The hostname on which port resolution should be performed. Can be either an IPv4 or IPv6 address.

### makeRange(from, to)

Make a range of ports `from`...`to`.

Returns an `Iterable` for ports in the given range.

#### from

Type: `number`

First port of the range. Must be in the range `1024`...`65535`.

#### to

Type: `number`

Last port of the range. Must be in the range `1024`...`65535` and must be greater than `from`.

<style type="text/css">
.markdown-body a:hover, .markdown-body a:focus, .markdown-body a:active {
  text-decoration: none;
}
</style>