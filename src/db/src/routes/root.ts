import { FastifyPluginAsync } from 'fastify'

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	fastify.get('/', async function(request, reply) {
		reply.code(403)
	})
}

export default root
