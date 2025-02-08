import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    './src/Components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      boxShadow: {
        'custom-shadow': '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.1), inset 0 2px 2px rgba(255, 255, 255, 0.95)',
      },
    }, 
  },
  plugins: [], 
  darkMode: 'class',
};

export default config;
