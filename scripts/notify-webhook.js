import fs from 'fs';
import path from 'path';

const WEBHOOK_URL = process.env.MAKE_WEBHOOK_URL;

async function notifyWebhook() {
  console.log('--- RADIOPAGANDA POST-BUILD AUTOMATION ---');

  if (!WEBHOOK_URL) {
    if (process.env.NODE_ENV === 'production') {
      console.error('❌ FATAL: MAKE_WEBHOOK_URL environment variable is missing.');
      process.exit(1);
    } else {
      console.log('⚠️ [DEV SKIP]: MAKE_WEBHOOK_URL not set. Skipping webhook execution safely for local development.');
      return;
    }
  }
  
  try {
    const categorySlug = process.argv[2];
    if (!categorySlug) {
      console.log('⚠️ [ABORT] No category argument provided to notify-webhook.js.');
      return;
    }

    const dataPath = path.resolve(process.cwd(), `public/data/categories/${categorySlug}.json`);
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    const db = JSON.parse(rawData);

    if (!db.articles || db.articles.length === 0) {
      console.log('⚠️ [ABORT] No articles found in JSON database.');
      return;
    }

    // Extract the FIRST (newest) article
    const latestArticle = db.articles[0];

    // Check if the social media MP4 hook is present
    if (!latestArticle.media || !latestArticle.media.video_url_social_mp4) {
      console.log(`⚠️ [ABORT] Article "${latestArticle.content?.title}" is missing 'video_url_social_mp4'. Aborting automated social post creation.`);
      return;
    }

    // Prepare content strings safely
    const hashtagsString = latestArticle.content?.hashtags?.join(' ') || '';
    const captionString = latestArticle.social_automation?.caption_text || '';
    const ctaString = latestArticle.social_automation?.call_to_action || '';
    
    // Format payload exactly as requested
    const payload = {
      title: latestArticle.content?.title || 'Unknown Title',
      video_url: latestArticle.media.video_url_social_mp4,
      social_text: `${captionString}\n\n${hashtagsString}\n\n${ctaString}`.trim()
    };

    console.log(`🚀 Transmitting payload for "${payload.title}" to Make.com...`);

    // Send the POST request using native Node fetch (v18+)
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log('✅ PROTOCOL SUCCESS: Make.com Webhook successfully received the transmission.');
    } else {
      console.error(`❌ PROTOCOL ERROR: Payload transmission failed. Status code: ${response.status}`);
      const errText = await response.text();
      console.error(`Response details: ${errText}`);
    }

  } catch (error) {
    console.error('❌ FATAL ERROR: Webhook notification threw an exception:', error);
    process.exit(1); 
  }
}

notifyWebhook();
