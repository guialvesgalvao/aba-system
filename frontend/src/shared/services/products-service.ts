import { ProductModel } from "../models/products-model";

import { wait } from "../helpers/testing-helper";
import { createProductsMockBasedOnLength } from "../mocks/products-mocks";

/**
 * Service to get all products from the API
 * @returns  {Promise<Array<ProductModel>>} List of all products
 */
export async function getAllProducts(): Promise<Array<ProductModel>> {
  try {
    const response = await createProductsMockBasedOnLength(100).then(
      (products) => wait<ProductModel[]>(1500, products)
    );

    return response;
  } catch (error) {
    throw new Error("Error getting all products");
  }
}

/**
 * Service to get active products
 * @returns {Promise<Array<ProductModel>>} List of active products
 */
export async function getActiveProducts(): Promise<Array<ProductModel>> {
  try {
    const response = await createProductsMockBasedOnLength(100).then(
      (products) => wait<ProductModel[]>(1500, products)
    );

    const filtered = await response.filter(
      (product) => product.active === "enabled"
    );

    return filtered;
  } catch (error) {
    throw new Error("Error getting active products");
  }
}

/**
 * Service to get draft products
 * @returns {Promise<Array<ProductModel>>} List of draft products
 */
export async function getDraftProducts(): Promise<Array<ProductModel>> {
  try {
    const response = await createProductsMockBasedOnLength(100).then(
      (products) => wait<ProductModel[]>(1500, products)
    );

    const filtered = await response.filter(
      (product) => product.active === "draft"
    );

    return filtered;
  } catch (error) {
    throw new Error("Error getting draft products");
  }
}

/**
 * Service to get archived products
 * @returns {Promise<Array<ProductModel>>} List of archived products
 */
export async function getArchivedProducts(): Promise<Array<ProductModel>> {
  try {
    const response = await createProductsMockBasedOnLength(100).then(
      (products) => wait<ProductModel[]>(1500, products)
    );

    const filtered = await response.filter(
      (product) => product.active === "archived"
    );

    console.log({ archived: filtered });
    return filtered;
  } catch (error) {
    throw new Error("Error getting archived products");
  }
}
