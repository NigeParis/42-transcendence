import { AutoloadPluginOptions } from '@fastify/autoload';
import { FastifyPluginAsync } from 'fastify';
export type AppOptions = {} & Partial<AutoloadPluginOptions>;
declare const options: AppOptions;
declare module 'fastify' {
    interface FastifyInstance {
        image_store: string;
    }
}
declare const app: FastifyPluginAsync<AppOptions>;
export default app;
export { app, options };
