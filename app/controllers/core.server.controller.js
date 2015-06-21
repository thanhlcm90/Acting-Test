'use strict';

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
    res.render('index', {
        request: req
    });
};

exports.admin = function(req, res) {
    res.render('admin', {
        user: req.user || null,
        request: req
    });
}
