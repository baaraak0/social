module.exports = {
	secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret',
	port: 3030,
    db: {
		url: 'mongodb://root:123123@ds127391.mlab.com:27391/social',
		debug: true
	}
};
