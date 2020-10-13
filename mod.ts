const min = 1024;
const max = 65535;
const getAvailablePort = (options: Deno.ListenOptions): Promise<number> => new Promise((resolve, reject) => {
  try {
    const server = Deno.listen(options);
    const { port } = options;
    server.close();
    resolve(port);
  } catch (e) {
  	reject(e);
  }
})

function makeRange(from: number, to: number): Iterable<number> {
	if (!Number.isInteger(from) || !Number.isInteger(to)) throw new TypeError('`from` and `to` must be integer numbers');
	if (from < min || from > max) throw new RangeError('`from` must be between 1024 and 65535');
	if (to < min || to > max) throw new RangeError('`to` must be between 1024 and 65536');
	if (to < from) throw new RangeError('`to` must be greater than or equal to `from`');
	var ports = [];
	for (let port = from; port <= to; port++) ports.push(port);
	return ports;
};

async function randomPort(options: any): Promise<any> {
  const port = Math.ceil(Math.random() * (max - min) + min);
  return await getAvailablePort({...options, port}).catch((error) => {
  	handleError(error)
  	return randomPort(options).catch(handleError);
  }).catch(handleError);
};

function handleError (error: Error) {
	if (error.name !== 'AddrInUse') throw error;
}

async function getPort (options: any) {
	let ports: Iterable<number>;
	let listenOptions: Deno.ListenOptions = {
		hostname: options.hostname || '0.0.0.0',
		port: (typeof options.port === 'number') ? options.port : 0
	}

	if (!options.port || options.port === 0) return await randomPort(listenOptions).catch(handleError)
	else if (typeof options.port === 'number' && options.port !== 0) {
		return await getAvailablePort(listenOptions).catch(async (error) => {
			handleError(error)
			return await randomPort(listenOptions).catch(handleError);
		});
	} else if (typeof options.port === 'object') {
		ports = options.port;
	    for (const port of ports) {
	    	const result: any = await getAvailablePort({...listenOptions, port}).catch(handleError);
	    	if (!!result) return result
	    }
	} else throw new Error('No available ports found');
};

export { getPort, randomPort, makeRange }
export default getPort
