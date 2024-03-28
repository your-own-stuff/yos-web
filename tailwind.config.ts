import { skeleton } from '@skeletonlabs/tw-plugin';
import { join } from 'path';
import type { Config } from 'tailwindcss';
import { yosTheme } from './yos-theme';

const config = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		join(require.resolve('@skeletonlabs/skeleton'), '../**/*.{html,js,svelte,ts}')
	],
	theme: {
		extend: {}
	},
	plugins: [
		require('@tailwindcss/forms'),
		skeleton({
			themes: { custom: [yosTheme] }
		})
	]
} satisfies Config;

export default config;
