import { defineEventHandler } from 'h3';
import { readFileSync } from 'fs';
import { resolve } from 'path';

export default defineEventHandler(async (event) => {
  try {
    // Read the static JSON file
    const filePath = resolve(process.cwd(), 'public/data/categories/operacion-rebelde.json');
    const fileData = readFileSync(filePath, 'utf-8');
    const db = JSON.parse(fileData);

    const baseUrl = 'https://radiopaganda.es';

    // Map articles to the required schema for Make.com
    const feed = db.articles.map((article: any) => {
      // Gather hashtags
      const hashtags = article.content.hashtags ? article.content.hashtags.join(' ') : '';
      
      // Concat social text
      const socialText = `${article.social_automation.caption_text}\n\n${hashtags}\n\n${article.social_automation.call_to_action}`.trim();

      return {
        id: article.id,
        title: article.content.title,
        url: `${baseUrl}/categorias/${article.category}/${article.slug}`,
        video_mp4: article.media.video_url_social_mp4,
        social_text: socialText,
        publish_date: new Date().toISOString() // In a real app this would be a specific release date, falling back to build time.
      };
    });

    return feed;
  } catch (error) {
    console.error('Error generating feed:', error);
    return { error: 'Failed to generate RSS/JSON feed' };
  }
});
