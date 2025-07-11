import { defineConfig } from 'vite';
import ViteRestart from 'vite-plugin-restart';

export default defineConfig(({command} : ConfigEnv) => ({

    base: command === 'serve' ? '/' : '/dist/',

    build: {
     manifest: true,
     rollupOptions: {
        input: {
            app: 'src/js/app.js',
        },
     },
     
     outDir: 'web/dist',
    },

    plugins: [
        ViteRestart(
            {
            restart: ['./templates/**']
            }
            )
    ],





    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,
        cors: {
            origin: /https?:\/\/([A-Za-z0-9\-.]+)?(localhost|\.local|\.test|\.site)(?::\d+)?/
        },

        origin: "https://filament-boiler.ddev.site:5173",

        watch: {
            ignored: ['node_modules','./vendor/**','./storage/**','./config/**']
        }

    },

  
   



}));
