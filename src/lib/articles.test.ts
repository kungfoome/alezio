import { describe, it, expect, vi } from 'vitest';
import { getPublishedArticles, getArticles } from './articles'; // Adjust the import path
import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

type Article = CollectionEntry<'articles'>;

// Mocking the getCollection function from 'astro:content'
vi.mock('astro:content', () => ({
    getCollection: vi.fn()
}));

describe('getPublishedArticles', () => {
    // We set this to prod as we don't filter drafts in development
    import.meta.env.PROD = true;

    // Test for default filter application
    it('applies the default filter correctly', async () => {
        const mockArticles = [
            { data: { draft: true, title: 'Draft Article' } },
            { data: { draft: false, title: 'Published Article' } }
        ];
        // @ts-ignore
        getCollection.mockResolvedValue(mockArticles);

        const articles = await getPublishedArticles({});
        expect(articles).toEqual([mockArticles[1]]);
    });
});

describe('getArticles', () => {
    // Test for combining default and custom filters
    it('combines default and custom filters (featured and after 2024)', async () => {
        const mockArticles = [
            {
                data: {
                    featured: true,
                    title: 'Featured Published Article',
                    publishedDate: '2024-01-01'
                }
            },
            {
                data: {
                    featured: false,
                    title: 'Non-Featured Published Article Before 2024',
                    publishedDate: '2023-01-02'
                }
            },
            {
                data: {
                    featured: false,
                    title: 'Non-Featured Published Article After 2024',
                    publishedDate: '2024-01-01'
                }
            },
            {
                data: {
                    featured: true,
                    title: 'Featured Published Article Before 2024',
                    publishedDate: '2023-12-25'
                }
            }
        ];
        // @ts-ignore
        getCollection.mockResolvedValue(mockArticles);

        const customFilter = (article: Article) =>
            article.data.featured &&
            new Date(article.data.publishedDate) >= new Date('2024-01-01');
        const articles = await getPublishedArticles({ customFilter });
        expect(articles).toEqual([mockArticles[0]]);
    });

    // Test for sorting
    it('sorts articles correctly', async () => {
        const mockArticles = [
            {
                data: {
                    title: 'Article B',
                    publishedDate: '2024-01-02'
                }
            },
            {
                data: {
                    title: 'Article A',
                    publishedDate: '2024-01-01'
                }
            },
            {
                data: {
                    title: 'Article C',
                    publishedDate: '2023-12-25'
                }
            }
        ];

        // @ts-ignore
        getCollection.mockResolvedValue(mockArticles);

        const articles = await getArticles({
            sortBy: 'publishedDate',
            sortOrder: 'ascend'
        });
        expect(articles).toEqual([
            mockArticles[2],
            mockArticles[1],
            mockArticles[0]
        ]);
    });

    // Test for pagination
    it('paginates results correctly', async () => {
        const mockArticles = new Array(10).fill(null).map((_, i) => ({
            data: {
                title: `Article ${i}`,
                publishedDate: `2022-01-${i + 1}`
            }
        }));

        // @ts-ignore
        getCollection.mockResolvedValue(mockArticles);

        const limit = 5;
        const page = 2;
        const articles = await getArticles({ limit, page });
        const startIndex = (page - 1) * limit;
        expect(articles).toEqual(
            mockArticles.slice(startIndex, startIndex + limit)
        );
    });
});
