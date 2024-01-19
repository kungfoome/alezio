interface OpenGraphConfig {
    type: string;
    locale: string;
    image: string;
    imageAltText: string;
    imageWidth: number;
    imageHeight: number;
}

interface SiteConfig {
    siteName: string;
    favIcon: string;
    sitemap: string;
    rss: string;
    defaultTitle: string;
    description: string;
    baseUrl: string;
    author: string;
    blogPostPath: string;
    openGraph: OpenGraphConfig;
}

const siteConfig: SiteConfig = {
    siteName: 'Alez.io Blog',
    favIcon: '/favicon.svg',
    sitemap: '/sitemap-index.xml',
    rss: '/rss.xml',
    defaultTitle: 'Alez.io',
    description:
        'Blog site about DevOps/Platform/SRE topics and whatever is on my mind',
    baseUrl: import.meta.env.PROD ? 'https://alez.io' : 'http://localhost:4321',
    author: 'Alez.io',
    blogPostPath: 'article',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        image: 'https://alez.io/og.png',
        imageAltText: 'Alex.io logo',
        imageWidth: 600,
        imageHeight: 600
    }
};

export default siteConfig;
