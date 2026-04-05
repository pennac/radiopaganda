export interface Manifesto {
  title: string;
  description: string;
  seo_title: string;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  description: string;
}

export interface Metadata {
  manifesto: Manifesto;
  categories: Category[];
}

export interface SeoInfo {
  meta_title: string;
  meta_description: string;
}

export interface ArticleContent {
  title: string;
  hook: string;
  body: string;
  cta: string;
  tags?: string[];
}

export interface Media {
  video_url_hls: string;
  thumbnail: string;
  captions_vtt: string;
}

export interface Article {
  id: string;
  slug: string;
  category: string;
  status: string;
  seo: SeoInfo;
  content: ArticleContent;
  media: Media;
}

export interface ContentPayload {
  project: string;
  metadata: Metadata;
  articles: Article[];
}

export const useContent = () => {
  const fetchManifesto = async (): Promise<Manifesto> => {
    // Fetch from master index
    const data: any = await $fetch('/data/index.json');
    return data.manifesto;
  };

  const fetchCategories = async (): Promise<Category[]> => {
    const data: any = await $fetch('/data/index.json');
    return data.categories;
  };

  const fetchArticlesByCategory = async (categorySlug: string): Promise<Article[]> => {
    try {
      const data: any = await $fetch(`/data/categories/${categorySlug}.json`);
      return data.articles || [];
    } catch (e) {
      console.warn(`Category JSON not found: ${categorySlug}`);
      return [];
    }
  };

  const fetchArticleBySlug = async (slug: string, categorySlug: string = 'operacion-rebelde'): Promise<Article | undefined> => {
    const articles = await fetchArticlesByCategory(categorySlug);
    return articles.find(a => a.slug === slug);
  };

  return {
    fetchArticleBySlug,
    fetchManifesto,
    fetchCategories,
    fetchArticlesByCategory
  };
};
