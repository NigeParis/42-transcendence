import { fastifyStatic } from '@fastify/static'
import process from 'node:process'
import { FastifyPluginAsync } from 'fastify'

const example: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
	console.log("HELLO ????")
	fastify.post('/set/:userid', async function(request, reply) {
		console.log(request.params)
	})
	
	fastify.register(fastifyStatic, {
		root: process.env.USER_ICONS_STORE ?? "/tmp/icons",
		prefix: '/get',
	})
}

export default example
