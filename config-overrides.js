var path = require('path');
const { override, addWebpackAlias } = require('customize-cra');

module.exports = function(config, env) {
  return Object.assign(
    config,
    override(
      // add an alias for "our" imports
      addWebpackAlias({
        '@src': path.resolve(__dirname, 'src')
      })
    )(config, env)
  );
};
