const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    var token = req.headers.authorization
    if (!(token)) {
        return res.status(401).json({
            error: "Missing token. Expects token in header with key as Authorization"
        })
    } else {
        jwt.verify(token, 'secret', function(err, decoded) {
            if (err) {
                return res.status(401).json({
                    message: 'Authentication failed. Invalid token.'
                });
            } else {
                req.user = decoded.data;
                next();
            }
        });
    }
}

    // return res.json({'msg': 'Verify auth'}).status(200)
    // next();
