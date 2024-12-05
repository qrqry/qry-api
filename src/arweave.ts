import Arweave from 'arweave'
import { Product } from './model/Product.ts'

const _arweave = Arweave.init({
  host: Deno.env.get('ARWEAVE_HOST') ?? 'arweave.net',
  port: Number(Deno.env.get('ARWEAVE_PORT') ?? 443),
  protocol: Deno.env.get('ARWEAVE_PROTOCOL') ?? 'https',
})
const _key = JSON.parse(Deno.env.get('ARWEAVE_KEY') ?? '{}')

export const saveJson = async <P extends Product>(
  json: P,
): Promise<boolean> => {
  try {
    const data = JSON.stringify(json)
    const transaction = await _arweave.createTransaction({ data }, _key)
    transaction.addTag('Content-Type', 'application/json')
    await _arweave.transactions.sign(transaction, _key)
    const uploader = await _arweave.transactions.getUploader(transaction)
    while (!uploader.isComplete) {
      await uploader.uploadChunk()
      console.log(
        `${uploader.pctComplete}% complete. ${uploader.uploadedChunks}/${uploader.totalChunks}`,
      )
    }
    return uploader.isComplete
  } catch (error) {
    console.error(error)
    return false
  }
}

export const getBalanceInWinston = async () =>
  await _arweave.wallets.getBalance(_key)

export const getBalanceInAr = async () =>
  _arweave.ar.winstonToAr(await getBalanceInWinston())
