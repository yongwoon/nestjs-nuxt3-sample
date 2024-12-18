import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query';

export default defineNuxtPlugin((nuxtApp) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        retry: 2,
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
        staleTime: 1000 * 60, // 1分
        gcTime: 1000 * 60 * 5, // 5分
      },
    },
  });

  nuxtApp.vueApp.use(VueQueryPlugin, {
    queryClient,
    clientPrefetch: false,
  });

  if (process.dev) {
    // @ts-ignore
    window.queryClient = queryClient;
  }

  return {
    provide: {
      queryClient,
    },
  };
});
