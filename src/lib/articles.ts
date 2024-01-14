import { getCollection } from 'astro:content';

export async function getPublishedPosts() {
    return await getCollection('articles', ({ data }) => {
        return import.meta.env.PROD ? data.draft !== true : true;
    });
}
