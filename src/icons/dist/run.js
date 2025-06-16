import fastify from "fastify";
import app from './app.js';
const start = async () => {
    const f = fastify({ logger: true });
    try {
        await f.register(app, {});
        await f.listen({ port: 80, host: '0.0.0.0' });
    }
    catch (err) {
        f.log.error(err);
        process.exit(1);
    }
};
start();
