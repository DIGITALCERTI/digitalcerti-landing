/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E7F8F8',
          100: '#D3F2F3',
          200: '#A7E5E7',
          300: '#7BD8DB',
          400: '#4FCBCF',
          500: '#31AFB4',
          600: '#278D90',
          700: '#1D6A6C',
          800: '#144648',
          900: '#0A2324',
          950: '#041010',
        },
        secondary: {
          50: '#E0F2FA',
          100: '#BDE4F5',
          200: '#7AC9EB',
          300: '#38AEE1',
          400: '#1B84B1',
          500: '#115571',
          600: '#0D4259',
          700: '#0A3242',
          800: '#07212C',
          900: '#031116',
          950: '#020A0D',
        },
      },
    },
    fontFamily: {
      sans: ['"Inter", sans-serif'],
    },
  },
  plugins: [
    function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          '@apply px-4 lg:max-w-[75rem] m-auto pt-[4.5rem] pb-[5.6rem]': {},
        },
      });
    },
  ],
};
