import { routerConfig } from './products.routes';
import { categoryFilter } from './products.category.filter';
import { ProductsController } from './products.controller';

export default angular.module('products', [])
  .config(routerConfig)
  .filter('categoryFilter', categoryFilter)
  .controller('ProductsController', ProductsController);
