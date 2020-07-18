const http = require('http');
const unfurl = require('simple-unfurl');
const afterLoad = require('after-load');

module.exports = {
    async parse(req, res) {
        const url = req.body.url;
        const pageData = await unfurl(url);
        const html = afterLoad(url);
        const response = JSON.parse(JSON.stringify(pageData , (k, v) => {
            return (v === undefined) ? "" : v
        }))
        response.htmlBody = html;
        return res.status(200).send(response);
    },
}