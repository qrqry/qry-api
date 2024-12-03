import Arweave from 'arweave'

const _arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
})
const _key = JSON.parse(Deno.env.get('ARWEAVE_KEY') ?? '{}')

export const saveJson = async (json: object): Promise<boolean> => {
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
