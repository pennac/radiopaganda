export default defineNuxtPlugin((nuxtApp) => {
  const GA_ID = 'G-K5NMJ5GNGE';

  useHead({
    script: [
      {
        src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`,
        async: true,
      },
      {
        innerHTML: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          
          // Default Consent Mode v2 setup
          gtag('consent', 'default', {
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'analytics_storage': 'denied'
          });

          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `,
        type: 'text/javascript',
      }
    ]
  });
});
