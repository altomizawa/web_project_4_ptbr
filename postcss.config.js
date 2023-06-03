
// Connect plugins to the file
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
  // Connect plugins to PostCSS
  plugins: [
    // Connect the autoprefixer
    autoprefixer,
    // Aprove object with options to onnect to cssnano:
    cssnano({ preset: "default" }) // define standard minification config
  ]
}; 