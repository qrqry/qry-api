import { qrcode } from '@libs/qrcode'

export const generate = (link: string): string =>
  qrcode(link, { output: 'svg' })
