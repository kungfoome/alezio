import rss from '@astrojs/rss';
import { getPublishedArticles } from '../lib/articles';

export async function GET(context) {
    const articles = await getPublishedArticles();
    return rss({
        title: 'Alez.io | Blog',
        description:
            'Blog site about DevOps/Platform/SRE topics and whatever is on my mind',
        site: context.site,
        items: articles.map((article) => ({
            title: article.data.title,
            pubDate: article.data.publishedDate,
            description: article.data.description,
            link: `/article/${article.slug}/`
        })),
        customData: `<language>en-us</language>`
    });
}
