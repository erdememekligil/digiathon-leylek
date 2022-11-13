const express = require('express');
const app = express();
const uuid = require('uuid');
const PDFDocument = require('pdfkit');
const keys = require("./keys.js");
const encdec = require("./encdec.js");
const { createHash } = require('crypto');



const requestLogs = [];
const documentTypes = ["Askerlik Durumu", "SGK Hizmet Dökümü", "Sabıka Kaydı"];

app.get('/status', function (req, res) {
    console.log("status check");
    res.send(requestLogs);
})

function hash(pdfstr) {
    return createHash('sha256').update(pdfstr).digest('hex');
  }

app.get('/createDocument', function (req, res) {
    const guid = uuid.v4();
    const filename = guid + '.pdf'
    console.log("createDocument request " + guid);

    const pdf = createDocument(guid);


    let buffers = [];
    pdf.on('data', buffers.push.bind(buffers));
    pdf.on('end', () => {
        let pdfData = Buffer.concat(buffers);
        let b64pdf = pdfData.toString('base64');
        let hashOfPdf = hash(b64pdf);
        console.log("hash of " + guid + " is " + hashOfPdf);
        // TODO hash b64pdf and put to chain

        const message = encdec.encryptData(b64pdf, keys.holder.publicKey, keys.issuer.secretKey);

        // let encodedDecodedMessage = JSON.parse(JSON.stringify(message));
        // let c = new Uint8Array(Object.keys(encodedDecodedMessage["cipher_text"]).length);
        // for (var i = 0; i < c.length; i++) {
        //     c[i] = encodedDecodedMessage["cipher_text"][i];
        // }
        // let o = new Uint8Array(Object.keys(encodedDecodedMessage["one_time_code"]).length);
        // for (var i = 0; i < o.length; i++) {
        //     o[i] = encodedDecodedMessage["one_time_code"][i];
        // }
        // let newOne = {"cipher_text": c, "one_time_code": o};

        res.writeHead(200, {
            'Content-Type': 'application/json',
        }).end(JSON.stringify(message));
    });

})
app.get('/createDocumentBare', function (req, res) {
    const guid = uuid.v4();
    const filename = guid + '.pdf'
    console.log("createDocumentBare request " + guid);

    const pdf = createDocument(guid);
    let buffers = [];
    pdf.on('data', buffers.push.bind(buffers));
    pdf.on('end', () => {
        let pdfData = Buffer.concat(buffers);
        res.writeHead(200, {
            'Content-Length': Buffer.byteLength(pdfData),
            'Content-Type': 'application/pdf',
            'Content-disposition': 'attachment;filename=' + filename,
        })
            .end(pdfData);
    });
})

function createDocument(guid) {
    let request_log = {
        "time": Date.now(),
        "id": guid,
        "type": documentTypes[Math.floor(Math.random() * documentTypes.length)],
        "status": "Error"
    }
    requestLogs.unshift(request_log);
    // create pdf
    let myDoc = new PDFDocument({bufferPages: true});
    myDoc.font('Times-Roman')
        .fontSize(12)
        .text(`Sample document with id` + guid);
    myDoc.end();

    request_log["status"] = "Generated"

    // encrypt

    // return pdf as base64
    return myDoc;
}

var server = app.listen(8080, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})