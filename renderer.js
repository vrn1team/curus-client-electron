// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var fs = require('fs');
var requestify = require('requestify');
var webcam = require('./lib/webcam');
var body = document.body;
var header = document.getElementsByClassName("main-header")[0];
var normalheader = document.getElementsByClassName("normal-header")[0];
var offlineheader = document.getElementsByClassName("offline-header")[0];

var dangers = [];

const ImageDataURI = require('image-data-uri');


function writeImageFile(URI, path) {
    //console.log(URI);

    try {
        ImageDataURI.outputFile(URI, path);
    } catch (e) { alert(e); }
}


function sendImageToServer(URI) {
    requestify.post('http://localhost:5000/predimg', {
        "img": URI
    })
        .then(function (response) {
            // Get the response body (JSON parsed or jQuery object for XMLs)
            toggleDisconnectedStatus(false);
            answer = response.getBody()["class_name"];
            console.log(answer);

        })
        .fail(function (response) {
            toggleDisconnectedStatus(true);
            console.log(response.getCode()); // Some error code such as, for example, 404
        });
}

function sendImageToServerAndCheckImmediate(URI) {
    requestify.post('http://localhost:5000/predimg', {
        "img": URI
    })
        .then(function (response) {
            // Get the response body (JSON parsed or jQuery object for XMLs)
            toggleDisconnectedStatus(false);
            answer = response.getBody()["class_name"];
            console.log(answer);
            toggleDangerStatus(answer);
        })
        .fail(function (response) {
            toggleDisconnectedStatus(true);
            console.log(response.getCode()); // Some error code such as, for example, 404
        });
}

function toggleDangerStatus(answer) {
    if (answer == "Danger") {
        body.classList.add("danger-red");
        header.classList.remove("hidden");
        normalheader.classList.add("hidden");
    } else {
        body.classList.remove("danger-red");
        header.classList.add("hidden");
        normalheader.classList.remove("hidden");
    }
}

function toggleDisconnectedStatus(disconnected) {
    if (disconnected) {
        body.classList.remove("danger-red");
        body.classList.add("neutral-white");
        offlineheader.classList.remove("hidden");
    } else {
        body.classList.remove("neutral-white");
        offlineheader.classList.add("hidden");
    }
}

function checkStatus() {
    requestify.get('http://localhost:5000/check')
        .then(function (response) {
            // Get the response body
            toggleDisconnectedStatus(false);
            answer = response.getBody()["class_name"];
            toggleDangerStatus(answer);
        })
        .fail(function (response) {
            toggleDisconnectedStatus(true);
            console.log(response.getCode()); // Some error code such as, for example, 404
        });
}
