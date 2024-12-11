import { generateDelay, generateId, images, texts } from '$lib/helpers';
import { Reply } from '$lib/types';
import type { ServerLoad } from '@sveltejs/kit';
import type { Actions } from './$types';
import { replies } from '$lib/server/db';

const SECOND = 1000;

export const load: ServerLoad = async () => {
    return {
        replies: replies.all()
    }
}

export const actions = {
    generateTextResponse: async () => {
        console.log('Generating text response...');
        // SIMULATING A DELAY
        const delay = generateDelay();
        console.log(`Simulating a delay of ${delay} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delay * SECOND));
        const reply = {
            id: generateId(),
            type: Reply.TEXT,
            timestamp: new Date().toISOString(),
            data: texts[Math.floor(Math.random() * texts.length)]
        }

        replies.add(reply)


        return {
            ok: true,
            reply
        }
    },
    generateImageResponse: async () => {
        console.log('Generating image response...');
        // const data = await request.formData();
        const id = generateId();

        // SIMULATING A DELAY
        const delay = generateDelay();
        console.log(`Simulating a delay of ${delay} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, delay * SECOND));

        const reply = {
            id,
            timestamp: new Date().toISOString(),
            type: Reply.IMAGE,
            data: images[Math.floor(Math.random() * images.length)]
        }

        replies.add(reply);
        return {
            ok: true,
            reply

        }
    }

} satisfies Actions;