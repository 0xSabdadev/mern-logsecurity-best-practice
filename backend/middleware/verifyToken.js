import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    //dapatkan token
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.senStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.senStatus(403)
        req.email = decoded.email
        next()
    })
}
