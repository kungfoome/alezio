import { z, type SchemaContext } from 'astro:content';

export enum Blur {
    None = "none",
    SM   = "sm",
    MD   = "md",
    LG   = "lg",
    XL   = "xl",
}

export enum ImageSize {
    XS = 3,
    SM = 5,
    MD = 8,
    LG = 13,
    XL = 21,
}

export const imageSchema = ({ image }: SchemaContext) =>
    z.object({
        src: image(),
        alt: z.string(),
        blur: z.enum([Blur.None, Blur.SM, Blur.MD, Blur.LG, Blur.XL]).optional(),
        imageSizeMobile: z.union([
            z.literal(ImageSize.XS),
            z.literal(ImageSize.SM),
            z.literal(ImageSize.MD),
            z.literal(ImageSize.LG),
            z.literal(ImageSize.XL)]
        ).optional(),
        imageSizeDesktop: z.union([
            z.literal(ImageSize.XS),
            z.literal(ImageSize.SM),
            z.literal(ImageSize.MD),
            z.literal(ImageSize.LG),
            z.literal(ImageSize.XL)]
        ).optional(),
        ratio: z.number().optional(),
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
    heroimage: imageSchema({ image }).optional(),
});
