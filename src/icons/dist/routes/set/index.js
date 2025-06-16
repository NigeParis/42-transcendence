import { join } from 'node:path';
import { open } from 'node:fs/promises';
import fastifyRawBody from 'fastify-raw-body';
import sharp from 'sharp';
const example = async (fastify, opts) => {
    await fastify.register(fastifyRawBody, { encoding: false });
    fastify.post('/:userid', { config: { rawBody: true, encoding: false } }, async function (request, reply) {
        const userid = request.params['userid'];
        if (userid === undefined) {
            return await reply.code(403);
        }
        const image_store = fastify.getDecorator('image_store');
        const image_path = join(image_store, userid);
        try {
            let img = sharp(request.rawBody);
            img.resize({
                height: 512,
                width: 512,
                fit: 'fill',
            });
            const data = await img.png({ compressionLevel: 6 }).toBuffer();
            let image_file = await open(image_path, "w", 0o666);
            await image_file.write(data);
            await image_file.close();
        }
        catch (e) {
            fastify.log.error(`Error: ${e}`);
            reply.code(400);
            return { status: "error", message: e.toString() };
        }
    });
};
export default example;
