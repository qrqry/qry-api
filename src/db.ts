import { Product } from './model/Product.ts'

const _db = Deno.openKv()

export const getProduct = async <P extends Product>(
  id: string,
): Promise<P | null> => {
  const db = await _db
  const entry = await db.get<P>(['product', id])
  return entry.value
}

export const saveProduct = async <P extends Product>(
  product: P,
): Promise<string> => {
  const db = await _db
  product.id = product.id ?? crypto.randomUUID()
  const entry = await db.get<P>(['product', product.id])
  const res = await db.atomic()
    .check(entry)
    .set(['product', product.id], product)
    .commit()

  if (!res.ok) {
    throw new Error(
      `Product with name ${product.name} was not saved successfully`,
    )
  }
  return product.id
}
