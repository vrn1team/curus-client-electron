// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var fs = require('fs');
var webcam = require('./lib/webcam');

const ImageDataURI = require('image-data-uri');


function convertURIToImageData(URI) {
    return new Promise(function (resolve, reject) {
        if (URI == null) return reject();
        var canvas = document.createElement('canvas'),
            context = canvas.getContext('2d'),
            image = new Image();
        image.addEventListener('load', function () {
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            resolve(context.getImageData(0, 0, canvas.width, canvas.height));
        }, false);
        image.src = URI;
    });
}

function writeImageFile(URI, path) {

    // Here you can use imageData
    console.log(URI);



    try {
        //var buf = new Buffer();
        ImageDataURI.outputFile(URI, path);

    } catch (e) { alert(e); }
}

