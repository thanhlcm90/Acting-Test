'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    validator = require('validator'),
    errorHandler = require('./errors.server.controller'),
    utils = require('../libs/utils'),
    TestCase = mongoose.model('TestCase'),
    _ = require('lodash');

/**
 * Create a TestCase
 */
exports.create = function(req, res) {
    var testcase = new TestCase(req.body);
    testcase.user_created = req.user;

    testcase.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(testcase);
        }
    });
};

/**
 * Show the current TestCase
 */
exports.read = function(req, res) {
    res.json(req.testcase);
};

/**
 * Update a TestCase
 */
exports.update = function(req, res) {
    var testcase = req.testcase;
    testcase = _.extend(testcase, req.body);
    testcase.save(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(testcase);
        }
    });
};

/**
 * Delete an TestCase
 */
exports.delete = function(req, res) {
    var testcase = req.testcase;

    testcase.remove(function(err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(testcase);
        }
    });
};

/**
 * List of TestCase
 */
exports.list = function(req, res) {
    var group = req.query.group;

    if (validator.isNull(group))
        return res.status(400).send({
            message: 'ERROR_GROUP_MISSING'
        });

    var query = TestCase
        .find()
        .where({
            group: group
        })
        .sort('code');
    query.paging(req, function(err, testcases) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.json(testcases);
        }
    });
};

/**
 * TestCase middleware
 */
exports.testcaseByID = function(req, res, next, id) {
    TestCase.findById(id).populate('user_created', 'displayName').exec(function(err, testcase) {
        if (err) return next(err);
        if (!testcase) return next(new Error('ERROR_TESTCASEID_' + id + '_NOT_EXISTS'));
        req.testcase = testcase;
        next();
    });
};

/**
 * TestCase authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
    if (req.testcase.user_created.id !== req.user.id) {
        return res.status(403).send({
            message: 'ERROR_USER_NOT_AUTHORIZED'
        });
    }
    next();
};
