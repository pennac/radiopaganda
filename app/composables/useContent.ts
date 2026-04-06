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
    try {
      const data: any = await $fetch('/data/index.json');
      return data?.manifesto || {
        title: 'RADIOPAGANDA',
        description: 'Transmisión Clandestina',
        seo_title: 'RADIOPAGANDA',
        tags: []
      };
    } catch (e) {
      console.warn('Failed to load root manifesto:', e);
      return { title: 'ERROR', description: 'SEÑAL PERDIDA', seo_title: 'Error', tags: [] };
    }
  };

  const fetchCategories = async (): Promise<Category[]> => {
    try {
      const data: any = await $fetch('/data/index.json');
      return data?.categories || [];
    } catch (e) {
      console.warn('Failed to load categories:', e);
      return [];
    }
  };

  const fetchArticlesByCategory = async (categorySlug: string): Promise<Article[]> => {
    try {
      const data: any = await $fetch(`/data/categories/${categorySlug}.json`);
      return data?.articles || [];
    } catch (e) {
      console.warn(`Critical: Category JSON not found: ${categorySlug}`, e);
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
