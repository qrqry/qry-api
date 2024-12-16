import { ProductSchema } from '../../schema/ProductSchema.ts'
import * as productRepository from './productRepository.ts'

export const getProduct = async (
  id: string,
): Promise<ProductSchema | null> => await productRepository.getProduct(id)

export const getProducts = async (
  parentId: string,
): Promise<ProductSchema[]> => await productRepository.getProducts(parentId)

export const saveProduct = async (
  product: ProductSchema,
): Promise<string | null> => await productRepository.saveProduct(product)
