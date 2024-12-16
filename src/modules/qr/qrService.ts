import { qrcode } from '@libs/qrcode'
import { getProduct } from '../product/productService.ts'
import { getRequiredEnv } from '@deno/kv-oauth'

export const generateQr = async (id: string): Promise<string | null> => {
  const { txId } = await getProduct(id) ?? {}
  if (txId === undefined) {
    return null
  }
  const protocol = getRequiredEnv('ARWEAVE_PROTOCOL')
  const domain = getRequiredEnv('ARWEAVE_HOST')
  const link = `${protocol}//${domain}/${txId}`
  return qrcode(link, { output: 'svg' })
}
