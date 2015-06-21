'use strict';

var async = require('async'),
    fs = require('fs'),
    _ = require('lodash'),
    validator = require('validator'),
    moment = require('moment'),
    Query = require('mongoose').Query;

    

/**
 * make query paging
 *
 * @param  {[type]} req   [description]
 * @param  {[type]} query [description]
 * @return {[type]}       [description]
 */
Query.prototype.paging = function(req, callback) {
    var page = req.query.page;
    var page_size = req.query.page_size;
    var order_by = req.query.order_by;

    // xử lý page
    if (validator.isNull(page))
        page = 1;
    if (validator.isInt(page))
        page = parseInt(page);
    else
        page = 1;
    if (page === 0) page = 1;

    // xử lý page_size
    if (validator.isNull(page_size))
        page_size = 10;
    if (validator.isInt(page_size))
        page_size = parseInt(page_size);
    else
        page_size = 10;
    if (page_size === 0) page_size = 10;

    var query = this;
    var model = query.model;
    
    async.parallel([function(cb) {
        model.count(query._conditions, function(err, cnt) {
            if (err) {
                cb(err);
            } else {
                cb(null, cnt);
            }
        });
    }, function(cb) {

        // order by
        if (!validator.isNull(order_by))
            query.sort(order_by);

        // paging
        if (page_size > 0) {
            query.skip((page - 1) * page_size);
            query.limit(page_size);
        }

        query.exec(function(err, data) {
            if (err) {
                cb(err);
            } else {
                cb(null, data);
            }
        });
    }], function(err, result) {
        if (err) {
            callback(err, []);
        } else {
            var data = result[1];
            var count = result[0];
            if (page_size < 0) page_size = count;
            var r = {
                item_total: count,
                page_count: count === 0 ? 0 : (~~((count - 1) / page_size) + 1),
                page: page,
                page_size: page_size,
                data: data
            };
            callback(null, r);
        }
    });
};