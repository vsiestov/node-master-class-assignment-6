const { parse } = require('querystring');

const Router = () => {
	const routes = {
	};

	const handle = (method) => {
		return (path, cb) => {
			routes[method] = {
				[path]: cb
			};
		};
	};

	const process = (req, res) => {
		const method = req.method;
		
		switch (method) {
			case 'post':
			case 'put':
			case 'patch':

				switch (req.headers['content-type']) {
					case 'application/json':
						req.body = JSON.parse(req.body);
						break;

					default:
						req.body = parse(req.body);
				}

				break;
		}

		routes[method][req.path](req, res);
	};

	const check = (method, path) => {
		return routes[method] && routes[method][path] && typeof routes[method][path] === 'function';
	};

	return {
		get: handle('get'),
		post: handle('post'),
		put: handle('put'),
		patch: handle('patch'),
		delete: handle('delete'),
		process: process,
		check: check
	};
};

module.exports = Router;
