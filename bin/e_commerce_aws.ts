import { EcommerceApiStack } from './../lib/ecommerceApi-stack';
import { ProductsAppStack } from './../lib/productsApp-stack';

import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';


const app = new cdk.App();
const env: cdk.Environment = {
  account: '033627801052',
  region: 'us-east-1'
};

const tags = {
  cost: 'Ecommerce',
  team: 'SiecolaCode'
};

const productsAppStack = new ProductsAppStack(app, "ProductsApp", {
  tags: tags,
  env: env
});

const eComerceApiStack = new EcommerceApiStack(app, "ECommerceApi", {
  productsFetchHandler: productsAppStack.productsFetchHandler,
  productsAdminHandler: productsAppStack.productsAdminHandler,
  tags: tags,
  env: env
})

eComerceApiStack.addDependency(productsAppStack)