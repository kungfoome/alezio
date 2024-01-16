import { getPublishedArticles } from '../lib/articles';
import { Tags } from '../schemas/ArticleSchema';

type TagInfo = {
    tag: Tags;
    tagLink: string;
    count: number;
};

export function getFormattedTag(tag: string): string {
    return tag.replace(/\s+/g, '_').toLowerCase();
}

export async function countTagsByArticles(): Promise<TagInfo[]> {
    const articles = await getPublishedArticles();

    const tagCounts = articles
        .map((article) => article.data.tags || [])
        .flatMap((tags) => tags)
        .reduce(
            (acc, tag) => {
                acc[tag] = acc[tag] || {
                    tag,
                    tagLink: getFormattedTag(tag),
                    count: 0
                };
                acc[tag].count++;
                return acc;
            },
            {} as Record<string, TagInfo>
        );

    // Sort by count
    return Object.values(tagCounts).sort((a, b) => b.count - a.count);
}
