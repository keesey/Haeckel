var HTML = '<!DOCTYPE HTML><html><head><title>&nbsp;</title></head><body></body></html>';

function dataURI(data, mimetype, base64, charset) {
    if (typeof mimetype === "undefined") { mimetype = 'text/javascript'; }
    if (typeof base64 === "undefined") { base64 = false; }
    if (typeof charset === "undefined") { charset = 'utf-8'; }
    return 'data:' + mimetype + ';charset=' + charset + (base64 ? ';base64' : '') + ',' + data;
}

try  {
    var system = require('system');
    if (system.args.length !== 3) {
        throw new Error('Correct usage: phantomjs render.js <figure.js> <output_folder>');
    }
    var inputFile = system.args[1], outputFolder = system.args[2], fs = require('fs');
    if (!fs.isFile(inputFile)) {
        throw new Error("Cannot find input file \"" + inputFile + "\".");
    }
    if (!fs.isDirectory(outputFolder)) {
        throw new Error("Cannot find output folder \"" + outputFolder + "\".");
    }
    var page = require('webpage').create();
} catch (e) {
    console.error(e);
    phantom.exit(1);
}
page.open(dataURI(HTML, 'text/html'), function (status) {
    try  {
        if (status !== 'success') {
            throw new Error('Error reading HTML.');
        } else if (!page.injectJs('haeckel.js')) {
            throw new Error('Cannot find haeckel.js.');
        } else {
        }
    } catch (e) {
        console.error(e);
        phantom.exit(1);
    }
    phantom.exit(0);
});
