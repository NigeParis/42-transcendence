import * as path from 'node:path';
import AutoLoad from '@fastify/autoload';
import { fileURLToPath } from 'node:url';
import fastifyFormBody from '@fastify/formbody';
import fastifyMultipart from '@fastify/multipart';
import { mkdir } from 'node:fs/promises';
import fp from 'fastify-plugin';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const options = {};
const app = async (fastify, opts) => {
    void fastify.register(fastifyFormBody, {});
    void fastify.register(fastifyMultipart, {});
    void fastify.register(fp(async (fastify) => {
        const image_store = process.env.USER_ICONS_STORE ?? "/tmp/icons";
        fastify.decorate('image_store', image_store);
        await mkdir(fastify.image_store, { recursive: true });
    }));
    void fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'plugins'),
        options: opts,
        forceESM: true
    });
    void fastify.register(AutoLoad, {
        dir: path.join(__dirname, 'routes'),
        options: opts,
        forceESM: true
    });
};
export default app;
export { app, options };
