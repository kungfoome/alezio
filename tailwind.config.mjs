/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            animation: {
                'blink': 'blink 1s infinite',
            },
            keyframes: {
                blink: {
                    '0%, 100%': { opacity: 1 },
                    '50%': { opacity: 0 },
                },
            },
            fontFamily: {
                'libre': ['"Libre Franklin"', 'sans-serif'],
            },
            minWidth: {
                'md': '768px', // This aligns with Tailwind's 'md' breakpoint
            }
        },
    },
    plugins: [],
    darkMode: 'class',
}
