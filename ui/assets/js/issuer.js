const {ipcRenderer} = require('electron')
http = require("http")

console.log("issuer.js triggered")

function poll() {
    console.log("polling");
    var options = {
        host: "localhost",
        port: 8080,
        path: '/status'
    };

    http.get(options, function (res) {
        //res.setEncoding('utf8');
        res.on('data', function (chunk) {
            let d = JSON.parse(chunk);
            //console.log('BODY: ' + d.length + " " + chunk);
            let logDiv = $("#issuer-logs");
            logDiv.empty();
            for (let i = 0; i < d.length; i++) {
                let row = d[i];

                let single_log = `
<section style="display: block">
    <span class="icon major fa-file"></span>
    <h3>${row["type"]}</h3>
    <div>${row["id"]}</div>
    <div>${new Date(row["time"]).toString()}</div>
</section>`;
                logDiv.append(single_log);
                //console.log("appended row", single_log)
            }
        });

    }).end();
    setTimeout(poll, 5000);
}

$(document).ready(function () {
    console.log("issuer.js ready");
    poll();
});

