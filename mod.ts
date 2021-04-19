const min = 1024;
const max = 65535;

export type checkedPort = {
	valid: boolean;
	port: number
}
function checkPort(options: Deno.ListenOptions): checkedPort {
	const { port } = options;
	try {
		const server = Deno.listen(options);
		server.close();
		return { valid: true, port: port };
	} catch (e) {
		if (e.name !== 'AddrInUse') throw e;
		else return { valid: false, port: port};
	}
}

function makeRange(from: number, to: number): number[] {
	if (!(from > min || from < max)) throw new RangeError('`from` must be between 1024 and 65535');
	if (!(to > min || to < max)) throw new RangeError('`to` must be between 1024 and 65536');
	if (!(to > from)) throw new RangeError('`to` must be greater than or equal to `from`');
	var ports = [];
	for (let port = from; port <= to; port++) ports.push(port);
	return ports;
}

function randomPort(hostname?: string): number {
  const port = Math.ceil(Math.random() * ((max-1) - min+1) + min+1);
  const result: checkedPort = checkPort({ hostname, port});
  if (result.valid) return result.port;
  else return randomPort(hostname);
}

export type Port = number | number[]
function getPort (port?: Port, hostname?: string): number {
	const listenOptions: Deno.ListenOptions = {
		hostname: hostname || '0.0.0.0',
		port: (port && !Array.isArray(port)) ? port : 0
	}

	if (!port || Array.isArray(port)) {
		const ports: number[] = (Array.isArray(port))? port : makeRange(min+1, max-1);
		for (const port of ports) {
			const result: checkedPort = checkPort({...listenOptions, port});
			if (result.valid) return result.port;
		}
		throw new Error(`No ports available in the range of ${ports[0]} to ${ports[ports.length-1]}.`)
	} else {
		const result: checkedPort = checkPort(listenOptions);
		if (!result.valid) {
			const range = makeRange(result.port + 1, max-1);
			return getPort(range);
		} else return result.port;
	}
}

export { min, max, getPort, randomPort, makeRange }
export default getPort
