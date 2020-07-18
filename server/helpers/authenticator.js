const jwt = require('jsonwebtoken');

const decryptToken = (token) => {
    return jwt.verify(token, 'secret', (err, decrypted) => {
        if (err){
            return null;
        }
        else {
            return decrypted;
        }
    })
}

module.exports = {
    authenticate(req, res, next){
        try {
            const bearerToken = req.headers.authorization.split('Bearer ')[1];
            const decrypted = decryptToken(bearerToken);
            if (decrypted == null){
                return res.status(401).send({ message:"Invalid token"});
            }
            req.auth = decrypted.data;
            next();
        }
        catch{
            return res.status(401).send({ message:"Error during authentication, make sure bearer token is provided"});
        }
        
    }
}