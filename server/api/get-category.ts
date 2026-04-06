import { defineEventHandler, getQuery } from 'h3';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

export default defineEventHandler((event) => {
  try {
    const query = getQuery(event);
    const slug = query.slug as string;
    
    if (!slug) return { articles: [] };

    const filePath = resolve(process.cwd(), `public/data/categories/${slug}.json`);
    
    if (existsSync(filePath)) {
      return JSON.parse(readFileSync(filePath, 'utf-8'));
    }
    
    return { articles: [] };
  } catch (error) {
    return { articles: [] };
  }
});
