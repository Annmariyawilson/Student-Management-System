const jwt = require('jsonwebtoken')

const jwtMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const result = jwt.verify(token,process.env.SECRET_KEY)
        req.payload = result.userId
        next()
    }
    catch (err) {
        console.log(err)
        res.status(400).json(err)
    }
}

module.exports = jwtMiddleware