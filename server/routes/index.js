const upload = require("multer")({ dest: 'uploads/' });

const userController = require('../controllers').users;

const authenticator = require('../helpers').authenticator;

const filesController = require('../controllers').files;

const parseController = require('../controllers').parse;

module.exports = (app) => {
    app.get('/api', (req, res) => res.status(200).send({
        message: 'Health check',
    }));

    app.post('/api/login', userController.login);

    app.get('/api/test', authenticator.authenticate, userController.test);

    app.post('/api/upload', authenticator.authenticate, upload.single('files'), filesController.create);

    app.get('/api/download/:filename', authenticator.authenticate, filesController.stream);

    app.get('/api/parse', authenticator.authenticate, parseController.parse);
};