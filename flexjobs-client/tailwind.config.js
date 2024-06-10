/** @type {import('tailwindcss').Config} */
export default {
  prefix: 'tw-',
  content: [
    './src/**/*.jsx', // paths to your components
    './index.html', // path to your HTML file
    './src/**/*.html', // paths to your components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}