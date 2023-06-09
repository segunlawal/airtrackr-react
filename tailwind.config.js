/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                "custom-blue": "#000080",
                "custom-black": "#1a1a1a"
            }
        }
    },
    plugins: []
};
