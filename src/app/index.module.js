import { routerConfig } from './index.routes';
import { runBlock } from './index.run';

import { entriesService } from './main/services/entries.service';
import { currentEntryService } from './main/services/currentEntry.service';

import { MainController } from './main/layout/main.controller.js';

/* eslint-disable no-unused-vars */
import { cart } from './modules/cart/cart.module';
import { products } from './modules/products/products.module';
/* eslint-enable no-unused-vars */

import './index.scss';

const app = angular.module(
  'Matrix42shop', [
    'ui.router',
    'angularUtils.directives.dirPagination',

    // modules
    'cart',
    'products',
  ]);

app
  .config(routerConfig)
  .run(runBlock)
  .service('entriesService', entriesService)
  .service('currentEntryService', currentEntryService)
  .controller('MainController', MainController);

export default app;
