const jwt = require ('jsonwebtoken');
require('dotenv').config()

module.exports = {
  authentication: (req, res, next) => {
    if (!req.headers.authorization) {
      return res.status(401).json({
        status: 401,
        message: 'Unauthorized. Only logged in users can access this endpoint.'
      })
    }

    try {
      req.user = jwt.verify(req.headers.authorization,process.env.SECRET_KEY);
    } catch (err) {
      return res.status(401).json({
        status: 400,
        message: 'Token invalid'
      })
    }
    next();
  },

    authorization: {
    admin: (req, res, next) => {
      if (req.user.roleType === 'ADMIN') return next();

      return res.status(401).json({
        status: 401,
        message: 'Unauthorized. Only admin can access this endpoint.'
      })
    },
    seller: (req, res, next) => {
      if (req.user.roleType === 'SELLER') return next();

      return res.status(401).json({
        status: 401,
        message: 'Unauthorized. Only seller can access this endpoint.'
      })
    },
    customer: (req, res, next) => {
      if (req.user.roleType === 'CUSTOMER') return next();

      return res.status(401).json({
        status: 401,
        message: 'Unauthorized. Only admin can access this endpoint.'
      })
    },
  }
}