import { defineEventHandler } from 'h3';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

export default defineEventHandler((event) => {
  try {
    const filePath = resolve(process.cwd(), 'public/data/index.json');
    if (existsSync(filePath)) {
      return JSON.parse(readFileSync(filePath, 'utf-8'));
    }
    return { manifesto: null, categories: [] };
  } catch (error) {
    return { manifesto: null, categories: [] };
  }
});
