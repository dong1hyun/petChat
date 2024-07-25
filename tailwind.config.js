/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'my-gray': "#E8E8E8"
      },
      fontFamily: {
        pretendard: ['"Pretendard Variable"', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}

