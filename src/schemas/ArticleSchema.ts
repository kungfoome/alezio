import { z, type SchemaContext } from 'astro:content';

export const imageSchema = ({ image }: SchemaContext) =>
    z.object({
        src: image(),
        alt: z.string(),
    });

export const articleSchema = ({ image }: { image: any }) => z.object({
    title: z.string(),
    author: z.string().optional(),
    description: z.string().optional(),
    publishedDate: z.string().or(z.date()).transform((str) => new Date(str)),
    updatedDate: z.string().optional().transform((str) => (str ? new Date(str) : undefined)),
    featured: z.boolean().default(false),
    draft: z.boolean().default(true),
    tags: z.array(z.enum(["SRE", "Frontend", "Platform Engineering"])),
    featuredimage: imageSchema({ image }).optional(),
    heroimage: image().optional(),
});
