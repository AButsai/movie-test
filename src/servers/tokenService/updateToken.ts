import { Token } from '../../model/index.js'

export const updateToken = async (owner: string, accessToken: string | null) => {
  await Token.updateOne({ owner }, { accessToken })
}
