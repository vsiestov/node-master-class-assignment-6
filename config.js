const env = {
};

env.staging = {
	httpPort: 3000,
	httpsPort: 3001,
	environment: 'staging'
};

env.production = {
	httpPort: 5000,
	httpsPort: 5001,
	environment: 'production'
};

module.exports = env[(process.env.NODE_ENV || '').toLowerCase()] || env.staging;
