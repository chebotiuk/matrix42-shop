import { routerConfig } from './cart.routes';
import { CartController } from './cart.controller';

export default angular.module('cart', [])
  .config(routerConfig)
  .controller('CartController', CartController);
