const Files = require('../models').Files;

module.exports = {
    create(req, res) {
        try {
            return Files.create({
                originalName: req.file.originalname,
                fileName: req.file.filename
            }).then(files => res.status(202).send(files.fileName))
            .catch(error => res.status(400).send(error));
        }
        catch (error) {
            return res.status(400).send(error);
        }
    },
    stream(req, res) {
        const file = `${__dirname}../../../uploads/${req.params.filename}`;
        res.download(file);
    }
}