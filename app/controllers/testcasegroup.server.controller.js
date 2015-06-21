'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    validator = require('validator'),
    errorHandler = require('./errors.server.controller'),
    utils = require('../libs/utils'),
    TestCaseGroup = mongoose.model('TestCaseGroup'),
    _ = require('lodash');

/**
 * Create a TestCaseGroup
 */
exports.create = function(req, res) {
    var testcasegroup = new TestCaseGroup(req.body);
    testcasegroup.user_created = req.user;

    testcasegroup.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(testcasegroup);
        }
    });
};

/**
 * Show the current TestCaseGroup
 */
exports.read = function(req, res) {
    res.json(req.testcasegroup);
};

/**
 * Update a TestCaseGroup
 */
exports.update = function(req, res) {
    var testcasegroup = req.testcasegroup;
    testcasegroup = _.extend(testcasegroup, req.body);
    testcasegroup.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(testcasegroup);
        }
    });
};

/**
 * Delete an TestCaseGroup
 */
exports.delete = function(req, res) {
    var testcasegroup = req.testcasegroup;

    testcasegroup.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(testcasegroup);
        }
    });
};

/**
 * List of TestCaseGroup
 */
exports.list = function(req, res) {
    var query = TestCaseGroup
        .find();
    query.paging(req, function(err, testcasegroups) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(testcasegroups);
        }
    });
};

/**
 * TestCaseGroup middleware
 */
exports.testcasegroupByID = function(req, res, next, id) {
    TestCaseGroup.findById(id).populate('user_created', 'displayName').exec(function(err, testcasegroup) {
        if (err) return next(err);
        if (!testcasegroup) return next(new Error('ERROR_TESTCASEGROUPID_' + id + '_NOT_EXISTS'));
        req.testcasegroup = testcasegroup;
        next();
    });
};

/**
 * TestCaseGroup authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.testcasegroup.user_created.id !== req.user.id) {
        return res.status(403).send({
            message: 'ERROR_USER_NOT_AUTHORIZED'
        });
    }
    next();
};
