import { VueQueryPlugin } from '@tanstack/vue-query';

export default async ({ app }) => {
  // Configura e inicializa el plugin VueQueryPlugin
  const vueQueryPluginOptions = {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 1,
        },
      },
    },
  };
  app.use(VueQueryPlugin, vueQueryPluginOptions);
};
