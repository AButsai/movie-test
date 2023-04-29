import rateLimit from 'express-rate-limit'

const { REQUEST_LIMIT, WINDOW_MS } = process.env

export const limiter = rateLimit({
  windowMs: WINDOW_MS as unknown as number,
  max: REQUEST_LIMIT as unknown as number,
  message: 'You ask too much',
})
