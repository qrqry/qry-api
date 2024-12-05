import { Product } from './model/Product.ts'
import * as database from './db.ts'
import * as qrService from './qr.ts'

export const getProduct = async <P extends Product>(
  id: string,
): Promise<P | null> => await database.getProduct(id)

export const generateQr = async (id: string): Promise<string | null> => {
  const { txId } = await getProduct(id) ?? {}
  if (txId === undefined) {
    return null
  }
  const protocol = Deno.env.get('ARWEAVE_PROTOCOL') ?? 'https'
  const domain = Deno.env.get('ARWEAVE_HOST') ?? 'arweave.net'
  const link = `${protocol}//${domain}/${txId}`
  return qrService.generate(link)
}
