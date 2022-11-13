const {app, ipcMain, BrowserWindow } = require('electron')

var path = require('path')
require('./dialog/dialog')
const encdec = require("./cipher/encdec");
const keys = require("./cipher/keys");
const fs = require("fs");
const http = require("http");
const {createHash} = require("crypto");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow
let secondWindow

function createWindow () {
    // Create the browser window.
    mainWindow = new BrowserWindow({titleBarStyle: 'hidden',
        width: 760,
        height: 600,
        minWidth: 400,
        minHeight: 600,
        backgroundColor: '#312450',
        show: false,
        icon: path.join(__dirname, 'assets/icons/png/64x64.png'),
        webPreferences: {
            nodeIntegration: true
        }
    })

    // and load the index.html of the app.
    //.loadFile ?
    mainWindow.loadURL(`file://${__dirname}/index.html`)

    // Open the DevTools.
    //mainWindow.webContents.openDevTools()


    // Show the mainwindow when it is loaded and ready to show
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    })

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })

    secondWindow = new BrowserWindow({frame: false,
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        backgroundColor: '#312450',
        show: false,
        icon: path.join(__dirname, 'assets/icons/png/64x64.png'),
        parent: mainWindow,
        webPreferences: {
            nodeIntegration: true
        }
    })

    secondWindow.loadURL(`file://${__dirname}/windows/ipcwindow.html`)
}

ipcMain.on('open-second-window', (event, arg)=> {
    secondWindow.show()
})

ipcMain.on('close-second-window', (event, arg)=> {
    secondWindow.hide()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
ipcMain.on('submitRequestForm', function(event, data) {
    console.log(data);
});

ipcMain.on('approveRequest', function(event, data) {
    console.log(data);

    for (let i = 0; i < 1; i++) {

        var options = {
            host: "localhost",
            port: 8080,
            path: '/createDocument'
        };

        http.get(options, function (res) {
            //res.setEncoding('utf8');
            let pdfCopy = null;
            res.on('data', function (chunk) {
                let d = JSON.parse(chunk);
                console.log('BODY: ' + d + " " + chunk);
                let encrypted = parseEncodedDecodedMessage(d);
                console.log("response " + encrypted);

                let decrypted = encdec.decryptData(encrypted, keys.holder.secretKey, keys.issuer.publicKey);
                let hashOfPdf = hash(decrypted);
                let pdf = Buffer.from(decrypted, 'base64');

                fs.writeFileSync(`files/${hashOfPdf}.pdf`, pdf);
                pdfCopy = pdf;

                let req = http.request({
                    host: "localhost",
                    port: 8081,
                    method: 'POST',
                    path: '/postDocuments'
                }, function (res){
                    console.log("postDocuments done")
                });
                req.write(JSON.stringify({'guid': 'b1787ea1-eaf0-420e-8745-33233cbe4fa0'}))
            });

        }).end();
    }
});


function parseEncodedDecodedMessage(encodedDecodedMessage){

    let c = new Uint8Array(Object.keys(encodedDecodedMessage["cipher_text"]).length);
    for (var i = 0; i < c.length; i++) {
        c[i] = encodedDecodedMessage["cipher_text"][i];
    }
    let o = new Uint8Array(Object.keys(encodedDecodedMessage["one_time_code"]).length);
    for (var i = 0; i < o.length; i++) {
        o[i] = encodedDecodedMessage["one_time_code"][i];
    }
    return {"cipher_text": c, "one_time_code": o};
}

function hash(pdfstr) {
    return createHash('sha256').update(pdfstr).digest('hex');
}