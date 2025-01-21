/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',  // Incluye la ruta a tu archivo HTML en la raíz
    './src/**/*.{js,ts,jsx,tsx}', // Si tienes archivos JS o TS en una carpeta src, incluye esta ruta
    './**/*.{html}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

