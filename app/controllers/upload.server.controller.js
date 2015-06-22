'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose');
var cloudinary = require('cloudinary');
var fs = require('fs');
var path = require('path');
var formidable = require('formidable');

exports.upload = function(req, res) {
    var form = new formidable.IncomingForm();
    var uploadDir = path.normalize(__dirname + '/../..') + "/public/uploads";
    form.uploadDir = uploadDir;
    form.keepExtensions = true;

    form.parse(req, function(err, fields, files) {
        var html;
        if (err) {
            console.log(err);
            return;
        }
        var fileName = mongoose.Types.ObjectId() + '_' + files.upload.name;
        var dest = uploadDir + '/' + fileName;

        // upload image to cloudinary
        cloudinary.uploader.upload(files.upload.path, function(image) {
            var msg = 'Uploaded file successfully';
            var url = '';
            if (!image) {
                console.error('Upload failed');
                msg = 'Uploaded file failed. Please try again later!';
            } else {
                url = image.url;
            }
            html = '';
            html += '<script type="text/javascript">';
            html += '   window.parent.CKEDITOR.tools.callFunction(' + req.query.CKEditorFuncNum + ', "' + url + '", "' + msg + '");';
            html += '</script>';
            res.send(html);
        });
    });
};
