/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
    /** include this below (remove this comment too)*/
    resolver: {                              
      sourceExts: ['jsx', 'js', 'ts', 'tsx'],
    },
};
