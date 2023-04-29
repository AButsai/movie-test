export interface ITokenConfig {
  secretAccess: string
  secretRefresh: string
  tokens: {
    access: {
      type: string
      expiresIn: string
    }
    refresh: {
      type: string
      expiresIn: string
    }
  }
}
