const User = require('../models').User;
const jwt = require('jsonwebtoken');

module.exports = {
    login(req, res) {
        if (!req.body.name || !req.body.password) return res.status(401).send({ message: "please provide both name and password" });

        return User.findAll({
            where: {
                name: req.body.name
            }
        }).then(userResponse => {
            if (!userResponse.length) {
                return res.status(401).send({ message: "username does not exist" });
            }
            const user = userResponse[0].dataValues;
            const password = user.password
            const isCorrectPassword = (req.body.password == password);
            if (isCorrectPassword) {
                const token = jwt.sign({
                    name: 'userToken',
                    data: {
                        id: user.id,
                        name: user.name
                    }
                }, 'secret');
                const data = { token };
                return res.status(200).send(data);
            }
            return res.status(401).send({ message: "incorrect credentials" });
        }).catch(error => {
            console.log(error);
            return res.status(500).send(error)
        });
    },
    test(req, res) {
        return res.status(200).send({ message: "success" });
    }
}