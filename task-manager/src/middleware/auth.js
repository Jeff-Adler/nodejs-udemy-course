const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        //gets authorization : bearer (token value) key-value pair, and eliminates 'bearer'
        const token = req.header('Authorization').replace('Bearer ', '')
        console.log(token)
        const decoded = jwt.verify(token, 'thisisasecret')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            //automatically triggers catch block
            throw new Error()
        }

        req.user = user
        next()
    } catch (e) {
        res.status(401).send({error : 'Please authenticate.'})
    }
}

module.exports = auth