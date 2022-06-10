/**
 * Quasar App Extension index/runner script
 * (runs on each dev/build)
 *
 * Docs: https://quasar.dev/app-extensions/development-guide/index-api
 * API: https://github.com/quasarframework/quasar/blob/master/app/lib/app-extension/IndexAPI.js
 */

function extendConf (conf) {
  // register our boot file
  conf.boot.push('~@tobymosque/quasar-app-extension-q-decimal-input/src/boot/register.js')

  // make sure app extension files & ui package gets transpiled
  conf.build.transpileDependencies.push(/@tobymosque[\\/]quasar-app-extension-q-decimal-input[\\/]src/)

  // make sure the stylesheet goes through webpack to avoid SSR issues
  conf.css.push('~@tobymosque/quasar-ui-q-decimal-input/src/index.sass')
}

module.exports = function (api) {
  // Quasar compatibility check; you may need
  // hard dependencies, as in a minimum version of the "quasar"
  // package or a minimum version of "@quasar/app-*" CLI
  api.compatibleWith('quasar', '^2.0.0')

  if (api.hasVite) {
    api.compatibleWith('@quasar/app-vite', '^1.0.0')
  }
  else if (api.hasWebpack) {
    api.compatibleWith('@quasar/app-webpack', '^3.4.0')
  }


  // Uncomment the line below if you provide a JSON API for your component
  // api.registerDescribeApi('QDecimalInput', '~quasar-ui-q-decimal-input/src/components/QDecimalInput.json')


  // We extend /quasar.conf.js
  api.extendQuasarConf(extendConf)
}
