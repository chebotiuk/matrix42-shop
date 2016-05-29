// index.html page to dist folder
/* eslint-disable import/no-unresolved */
import '!!file-loader?name=[name].[ext]!../favicon.ico';
/* eslint-enable import/no-unresolved */

import './index.module';

angular.element(document).ready(() => {
  angular.bootstrap(document, ['Matrix42shop'], {
    strictDi: true,
  });
});
