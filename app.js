const parser = require('./request-parser');
const Router = require('./router');

const app = function (req, res) {
	parser(req)
		.then((result) => {
			Object.assign(req, result);

			if (!app.router || !app.router.check(req.method, req.path)) {
				res.writeHead(404);

				return res.end('Not Found\n');
			}

			res.send = (data) => {
				if (typeof data === 'object') {
					res.setHeader('Content-Type', 'application/json');

					return res.end(JSON.stringify(data));
				}

				res.setHeader('Content-Type', 'text/plain');

				return res.end(JSON.stringify(data));
			};

			return app.router.process(req, res);
		})
		.catch((error) => {

			console.error('Unknown error', error);

			res.writeHead(500);
			res.end('Something went wrong\n');
		});
};

const router = Router();

app.router = router;

// === Routers (START) ===

router.get('/hello', (req, res) => {
	res.send({
		method: 'get',
		query: req.query
	});
});

router.post('/hello', (req, res) => {
	res.send({
		method: 'post',
		query: req.query,
		body: req.body
	});
});

router.put('/hello', (req, res) => {
	res.send({
		method: 'put',
		query: req.query,
		body: req.body
	});
});

router.patch('/hello', (req, res) => {
	res.send({
		method: 'patch',
		query: req.query,
		body: req.body
	});
});

router.delete('/hello', (req, res) => {
	res.send({
		method: 'delete',
		query: req.query
	});
});

// === Routers (END) ===

module.exports = app;
