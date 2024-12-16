import { qrcode } from '@libs/qrcode'
import { getProduct } from '../product/productService.ts'

export const generateQr = async (id: string): Promise<string | null> => {
  const { txId } = await getProduct(id) ?? {}
  if (txId === undefined) {
    return null
  }
  const protocol = Deno.env.get('ARWEAVE_PROTOCOL') ?? 'https'
  const domain = Deno.env.get('ARWEAVE_HOST') ?? 'arweave.net'
  const link = `${protocol}//${domain}/${txId}`
  return qrcode(link, { output: 'svg' })
}
