/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-radial': 'radial-gradient(circle, rgba(0,0,0,1) 0%, rgba(0,0,92,1) 81%)',
      },
    },
  },
  plugins: [],
};
