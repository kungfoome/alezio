import { defineCollection } from 'astro:content';
import { articleSchema } from '../schemas/ArticleSchema';

const articleCollection = defineCollection({
    type: 'content',
    schema: articleSchema,
});

export const collections = {
    'articles': articleCollection,
};