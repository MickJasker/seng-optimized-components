import Vue from 'vue';
import upperFirst from 'lodash/upperFirst';
import camelCase from 'lodash/camelCase';
import App from './App.vue';

require('intersection-observer');

const requireComponent = require.context(
  './components',
  true,
  /V[A-Z]\w+\.vue$/,
);

requireComponent.keys().forEach((fileName) => {
  // Get component config
  const componentConfig = requireComponent(fileName);

  // Get PascalCase name of component
  const componentName = upperFirst(
    camelCase(
      // Gets the file name regardless of folder depth
      fileName
        .split('/')
        .pop()!
        .replace(/\.\w+$/, ''),
    ),
  );

  // Register component globally
  Vue.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig,
  );
});

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
