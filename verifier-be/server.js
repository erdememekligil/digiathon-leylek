const express = require('express');
const app = express();
const uuid = require('uuid');
const PDFDocument = require('pdfkit');
const keys = require("./keys.js");
const encdec = require("./encdec");


const status_db = {};
const documents = ["Askerlik Durum Belgesi", "SGK Hizmet Dökümü", "Sabıka Kaydı", "İkametgah"]

app.get('/status', function (req, res) {
    console.log("status check");
    var values = Object.keys(status_db).map(function(key){
        return status_db[key];
    });
    res.send(values);
})

app.post('/requestDocuments', function (req, res) {
    const guid = uuid.v4();
    console.log("requestDocuments request " + guid);

    // add document request to blockchain
    //TODO

    status_db[guid] = {"guid":guid, "status": "requested", "documents": documents}
})

app.post('/postDocuments', function (req, res) {
    const guid = 123;  // get guid from request TODO
    console.log("postDocuments request " + guid);
    status_db[guid] = {"guid":guid, "status": "requested", "documents": documents}
    // verify and update status_db
    // TODO
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})