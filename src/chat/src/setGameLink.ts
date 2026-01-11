import { FastifyInstance } from 'fastify';


export async function setGameLink(fastify: FastifyInstance): Promise<Response | undefined> {
	

		let payload = {"user1":"019bad60-1e4a-7e28-af95-a8a88146107a", "user2":"019bad56-6468-748d-827e-110eb6aa4514"};
		try {
			const resp = await fetch('http://app-pong/api/pong/createPausedGame', {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: JSON.stringify(payload),
			});
			
			if (!resp.ok) { 
				
				console.log("chat detect fail :( ", resp.status);
			
				throw (resp); 
			}

			else { fastify.log.info('game-end info to chat success');
				console.log("caht detect success :)");
				// console.log("chat gets:", await resp.json());
			 }
			return resp;
		}
		// disable eslint for err catching
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		catch (e: any) {
			fastify.log.error(`game-end info to chat failed: ${e}`);
		}
	};