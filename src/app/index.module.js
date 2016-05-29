import { routerConfig } from './index.routes';

import { productsService } from './main/services/products.service';
import { categoriesService } from './main/services/categories.service';
import { cartService } from './main/services/cart.service';

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
  .service('productsService', productsService)
  .service('categoriesService', categoriesService)
  .service('cartService', cartService)
  .controller('MainController', MainController);

export default app;
