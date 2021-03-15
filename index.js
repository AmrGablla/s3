const AWS = require('aws-sdk');
const fs = require('fs'); // Needed for example below
var express = require('express');
var app = express();

const spacesEndpoint = new AWS.Endpoint('fra1.digitaloceanspaces.com');
const s3 = new AWS.S3({
    endpoint: spacesEndpoint,
    accessKeyId: 'LWGVBXA6XHWDDBZIP2JA',
    secretAccessKey: 'OvsIkeCVlfGW9ofzyHfICrdJnvcilN0JismX9MCedcU'
});




var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})

app.post('/listUsers', function (req, res, body) {


    var form = req.form();
    form.append('file', toBuffer(file.data), {
        filename: file.name,
        contentType: file.type
    });

    var params = {
        Bucket: "adler-audio-files",
        Key: file.name,
        Body: form,
        ACL: "private"
    };

    s3.putObject(params, function (err, data) {
        if (err) console.log(err, err.stack);
        else res.end(JSON.stringify(data));
    });
})

app.get('/get', function (req, res) {
    const expireSeconds = 60 * 5

    const url = s3.getSignedUrl('getObject', {
        Bucket: "adler-audio-files",
        Key: 'file.ext',
        Expires: expireSeconds
    });

    console.log(url);
})

