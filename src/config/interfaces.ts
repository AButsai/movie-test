export interface ITokenConfig {
  secretAccess: string
  tokens: {
    access: {
      type: string
      expiresIn: string
    }
  }
}
