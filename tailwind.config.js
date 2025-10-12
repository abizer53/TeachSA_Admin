/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        // 'primary': '#FB9400',
        // 'primary2': "#d47d00",
        // 'primary3': "rgba(251, 148, 0, 0.10)",
        'secondary': "#F5F5F5",
        'neutral': "rgba(0, 0, 0, 0.70)",
        "neutral2": "rgba(0, 0, 0, 0.40)",
        "neutral-800":"rgba(0, 0, 0, 0.80)",
        "neutral-900":"#525257",
        "neutral-1000":"#1C1C1C",
        "neutral-100":"rgba(204, 204, 204, 0.10)",
        'white': "#FFF",
        "success":"#4CAF50",
        "danger": "#F00",
        "black": "#000",
        "black-2": "#040404",
        "black-3": "#363636",
        "black-4": "#222",
        "blue": "#8A8B9F",
        "neutral-700":"#808085",



        'green': '#228B22',
        'green-dark':'#1c6e1c',
        'green-light': '#228B2240',
        'green-lightier':'#228b220d',
        'yellow': '#fdd106',
        'black': '#000',
        'yellow-light': '#FFD70040',
        'input-label': '#000000B2',
        'placeholder':'#00000080',
        'border-nput':'#0000000D',
        'danger': '#FF3509',
        'grey':'#808080'
      },
      fontSize: {
        "xxs": ["0.625rem","0.875rem"], // 10px
        xs: ['0.75rem', "1rem"], // 12px
        sm:["0.875rem","1.125rem"], // 14px
        base: ['1rem', "1.5rem"], // 16px
        lg: ["1.125rem","1.75rem"], // 18px
      },
      screens: {
        'xl': '1300px',
        "xxl": '1560px',
        "3xl":"1900px"
      },
      borderWidth: {
        "0.5": "0.5px",
        "1.5": "1.5px",
      },
      gridTemplateColumns:{
      },
      boxShadow:{
        'searchbox':'0 0 3px #1e293b26'
      }
    },
  },
  plugins: [],
};
