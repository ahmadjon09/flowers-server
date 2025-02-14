import jwt from 'jsonwebtoken'

const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message })
}

export default function (req, res, next) {
  try {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')
    if (!token) return sendErrorResponse(res, 401, 'Access not allowed! ⛔')

    const decoded = jwt.verify(token, process.env.JWTSECRET_KEY)
    if (!decoded || !decoded._id || !decoded.role) {
      return sendErrorResponse(res, 401, 'Invalid token! ⛔')
    }

    req.userInfo = { userId: decoded._id, role: decoded.role }
    next()
  } catch (error) {
    return sendErrorResponse(res, 401, 'Invalid or expired token! ⛔')
  }
}
