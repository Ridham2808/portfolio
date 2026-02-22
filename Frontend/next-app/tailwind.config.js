/** @type {import('tailwindcss').Config} */
// Tailwind v4 — custom tokens are now defined via @theme in globals.css
// This file is kept for any content path configuration needed by v4
module.exports = {
    content: [
        './app/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}',
        './lib/**/*.{js,jsx}',
    ],
};
