// index.html page to dist folder
/* eslint-disable import/no-unresolved */
import '!!file-loader?name=[name].[ext]!../favicon.ico';
import '!!file-loader?name=assets/data/[name].[ext]!../assets/data/products.json';
import '!!file-loader?name=assets/data/[name].[ext]!../assets/data/categories.json';
/* eslint-enable import/no-unresolved */

import './index.module';

angular.element(document).ready(() => {
  angular.bootstrap(document, ['Matrix42shop'], {
    strictDi: true,
  });
});
