import { routerConfig } from './products.routes';
import { ProductsController } from './products.controller';

export default angular.module('products', [])
  .config(routerConfig)
  .controller('ProductsController', ProductsController);
