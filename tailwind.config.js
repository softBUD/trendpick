/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}', // Next.js pages, components 경로
        './stories/**/*.{js,ts,jsx,tsx}', // Storybook stories 경로
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}
