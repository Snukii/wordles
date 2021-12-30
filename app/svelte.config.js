import adapter from "@sveltejs/adapter-auto";
import vercel from '@sveltejs/adapter-vercel';
import netlify from '@sveltejs/adapter-netlify';
import preprocess from "svelte-preprocess";
import WindiCSS from 'vite-plugin-windicss'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: [
    preprocess({
      scss: {
        prependData: '@import "src/variables.scss";',
      },
    }),
  ],

  kit: {
    adapter: netlify(),

    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",

    vite: {
      plugins:[
        WindiCSS(),
      ],
      css: {
        preprocessorOptions: {
          scss: {
            additionalData: '@import "src/variables.scss";',
          },
        },
      },
    },
  },
};

export default config;
