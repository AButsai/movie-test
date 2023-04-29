import path from "path"
import { fileURLToPath } from "url"

import { TMyObject } from "../@types/types.js"

type TFuncString = (str: string) => string

export const getFilename: TFuncString = (metaUrl: string): string => {
  const __filename = fileURLToPath(metaUrl)
  return __filename
}

export const getDirname: TFuncString = (metaUrl: string): string => {
  const __dirname = path.dirname(getFilename(metaUrl))
  return __dirname
}

export const firstLetterUppercase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export function exclude<User, Key extends keyof User>(user: User): Omit<User, Key> {
  const keys: string[] = ["password", "verificationToken", "createdAt", "tokens"]
  const filteredUser: Partial<User> = {}
  for (const key of Object.keys(user as TMyObject) as Key[]) {
    if (!keys.includes(key as string)) {
      filteredUser[key] = user[key]
    }
  }
  return filteredUser as Omit<User, Key>
}

export const getRandomInRange = (): number => {
  const randomNumber = Math.floor(Math.random() * 1000000)
  const code = randomNumber.toString().padEnd(6, "0")
  return Number(code)
}
