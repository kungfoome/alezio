import { z } from 'astro:content';

export const articleSchema = z.object({
    title: z.string(),
    author: z.string().optional(),
    description: z.string().optional(),
    publishedDate: z.string().or(z.date()).transform((str) => new Date(str)),
    updatedDate: z.string().optional().transform((str) => (str ? new Date(str) : undefined)),
    featured: z.boolean().default(false),
    draft: z.boolean().default(true),
    tags: z.array(z.enum(["SRE", "Frontend", "Platform Engineering"])),
    featuredimage: z.object({
        url: z.string(), //TODO: should probably specify a default image
        alt: z.string().optional(),
    }).optional(),
    heroimage: z.string().optional(), //TODO: should probably specify a default image
});
