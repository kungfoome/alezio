import { getCollection } from 'astro:content';
import type { CollectionEntry } from 'astro:content';

type Article = CollectionEntry<'articles'>;

type FilterFunction = (article: Article) => boolean;
type SortOrder = 'ascend' | 'descend' | 'none';
type SortField = keyof Article['data'] | keyof Article;

export async function getPublishedArticles({
    customFilter = null,
    sortBy = 'publishedDate',
    sortOrder = 'none',
    limit = 10,
    page = 1
}: {
    customFilter?: FilterFunction | null,
    sortBy?: SortField,
    sortOrder?: SortOrder,
    limit?: number,
    page?: number
} = {}) {
    const combinedFilter = (article: Article) => {
        const publishedFilter = import.meta.env.PROD ? article.data.draft !== true : true;
        return publishedFilter && (customFilter ? customFilter(article) : true);
    };

    return getArticles({
        customFilter: combinedFilter,
        sortBy,
        sortOrder,
        limit,
        page
    });
}

export async function getArticles({
    customFilter = null,
    sortBy = 'publishedDate',
    sortOrder = 'none',
    limit = 10,
    page = 1
}: {
    customFilter?: FilterFunction | null,
    sortBy?: SortField,
    sortOrder?: SortOrder,
    limit?: number,
    page?: number
} = {}) {
    const allArticles = await getCollection('articles');

    const combinedFilter = (article: Article) => {
        const defaultFilter = import.meta.env.PROD ? article.data.draft !== true : true;
        return defaultFilter && (customFilter ? customFilter(article) : true);
    };

    const filteredArticles = allArticles.filter(article => combinedFilter(article));

    const sortedArticles = sortArticles(filteredArticles, sortBy, sortOrder);

    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedArticles = sortedArticles.slice(startIndex, endIndex);

    return paginatedArticles;
}


function sortArticles(articles: Article[], sortBy: SortField, sortOrder: SortOrder): Article[] {
    if (sortOrder === 'none') {
        return articles;
    }

    return articles.sort((a, b) => {
        let fieldA: any = null;
        let fieldB: any = null;

        if (typeof sortBy === 'string' && sortBy in a.data) {
            // When sortBy is a key of Article['data']
            fieldA = a.data[sortBy as keyof Article['data']];
            fieldB = b.data[sortBy as keyof Article['data']];
        } else if (typeof sortBy === 'string') {
            // When sortBy is a top-level key of Article
            fieldA = a[sortBy as keyof Article];
            fieldB = b[sortBy as keyof Article];
        } else {
            // If neither, keep the items as is
            return 0;
        }

        if (sortOrder === 'ascend') {
            return (fieldA ?? '') < (fieldB ?? '') ? -1 : 1;
        } else { // sortOrder is 'descend'
            return (fieldA ?? '') > (fieldB ?? '') ? -1 : 1;
        }
    });
}
