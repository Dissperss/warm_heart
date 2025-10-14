import viteImagemin from "vite-plugin-imagemin";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    server: {
        watch: {
            usePolling: true,
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                quietDeps: true,
                logger: { warn: () => {} }, // полностью отключает предупреждения Sass
            },
        },
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                catalog: "catalog.html",
                blog: "blog.html",
                about: "about.html",
            },
        },
    },
    plugins: [
        viteImagemin({
            gifsicle: {
                optimizationLevel: 7,
                interlaced: false,
            },
            optipng: {
                optimizationLevel: 7,
            },
            mozjpeg: {
                quality: 70,
            },
            pngquant: {
                quality: [0.8, 0.9],
                speed: 4,
            },
            svgo: {
                plugins: [
                    {
                        name: "removeViewBox",
                    },
                    {
                        name: "removeEmptyAttrs",
                        active: false,
                    },
                ],
            },
        }),
    ],
});
