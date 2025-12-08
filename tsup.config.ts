import {fileURLToPath, URL} from 'node:url';

import {defineConfig} from 'tsup';

export default defineConfig({
    entry: {
        index: 'src/index.ts',
        types: 'src/types/index.ts',
        models: 'src/models/index.ts',
    },
    clean: true,
    format: ['cjs', 'esm'],
    dts: true,
    splitting: true,
    external: ['vue', '@kocdigital/sf-interface'],
    esbuildOptions(options) {
        options.alias = {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        };
    }
});
