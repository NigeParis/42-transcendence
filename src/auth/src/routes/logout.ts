import { FastifyPluginAsync } from 'fastify';

const route: FastifyPluginAsync = async (fastify, _opts): Promise<void> => {
	void _opts;
	fastify.post(
		async function(_req, res) {
			void _req;
			return res.clearCookie('token').send('{}');
		},
	);
};

export default route;
