const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        //gets authorization : bearer (token value) key-value pair, and eliminates 'bearer'
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisisasecret')
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!user) {
            //automatically triggers catch block
            throw new Error()
        }

        // I think these two statements actually modify the request itself, so that all routes that use auth middleware will now have access to these fields
        req.token = token
        req.user = user
        next()
    } catch (e) {
        res.status(401).send({error : 'Please authenticate.'})
    }
}

module.exports = auth