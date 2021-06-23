const tailwindcss = require('tailwindcss');
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

const mode = process.env.APP_ENV;
const dev = mode !== "production";

module.exports = {
    plugins: [
        tailwindcss,
        autoprefixer,
        !dev  && cssnano({
            preset: "default",
        }),
    ],
};



