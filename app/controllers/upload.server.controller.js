'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    fs = require('fs'),
    path = require('path'),
    formidable = require('formidable');

exports.upload = function(req, res) {
    var form = new formidable.IncomingForm();
    var uploadDir = path.normalize(__dirname + '/../..') + "/public/uploads";
    form.uploadDir = uploadDir;

    form.parse(req, function(err, fields, files) {
        var html;
        if (err) {
            console.log(err);
            return;
        }
        var fileName = mongoose.Types.ObjectId() + '_' + files.upload.name;
        var dest = uploadDir + '/' + fileName;
        fs.rename(files.upload.path, dest, function(err) {
            if (err) {
                console.log(err);
                return;
            }
            html = '';
            html += '<script type="text/javascript">';
            html += '   window.parent.CKEDITOR.tools.callFunction(' + req.query.CKEditorFuncNum + ', "/uploads/' + fileName + '", "Uploaded file successfully");';
            html += '</script>';
            res.send(html);
        });
    });
};
