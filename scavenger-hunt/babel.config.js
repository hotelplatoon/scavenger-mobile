module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
// module.exports = function(api) {
//   api.cache(true);
//   return {
//     presets: ['babel-preset-expo'],
//     plugins: ["transform-inline-environment-variables", {
//         "include": [
//           "NODE_ENV",
//           "BABEL_ENV_GOOGLE_CLOUD_VISION_API_KEY"
//         ]
//       }]
//   };
// };
