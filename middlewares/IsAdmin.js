const sendErrorResponse = (res, statusCode, message) => {
  return res.status(statusCode).json({ message })
}

export default function (req, res, next) {
  if (!req.userInfo || req.userInfo.role !== 'admin') {
    return sendErrorResponse(res, 403, 'Access not allowed, You are not admin!')
  }
  next()
}
