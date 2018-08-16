const env      = process.env.NODE_ENV || 'development';
const isDevEnv = env === 'development';

module.exports = {
	env,
	isDevEnv
};
