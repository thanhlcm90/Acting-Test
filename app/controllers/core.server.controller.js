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
};

exports.home = function(req, res) {
    res.render('frontend/index');
};

exports.about = function(req, res) {
    res.render('frontend/pages/about');
};

exports.cases = function(req, res) {
    var heads = [{
        'name': 'STORED BY'
    }, {
        'name': 'CASE TYPES'
    }, {
        'name': 'DIFFICULTIES'
    }, {
        'name': 'DATE ADDED'
    }];

    var cards = [{
        'image': '../img/frontend/images/amazon.png',
        'element': 'Increase profit, new product',
        'content': 'Amazon is an online e-economerce business. Recently, its profitability has been declinning after more than 10 years of straight improvement. In order to increase its profit, the company decided to start a new e-commerce business that targets the customers (B2B e-commerce)...'
    }, {
        'image': '../img/frontend/images/yamaha.png',
        'element': 'Increase profit, new product',
        'content': 'Amazon is an online e-economerce business. Recently, its profitability has been declinning after more than 10 years of straight improvement. In order to increase its profit, the company decided to start a new e-commerce business that targets the customers (B2B e-commerce)...'
    }, {
        'image': '../img/frontend/images/paypal.png',
        'element': 'Increase profit, new product',
        'content': 'Amazon is an online e-economerce business. Recently, its profitability has been declinning after more than 10 years of straight improvement. In order to increase its profit, the company decided to start a new e-commerce business that targets the customers (B2B e-commerce)...'
    }];
    res.render('frontend/pages/cases', {
        heads: heads,
        cards: cards
    });
};

exports.find = function(req, res) {
    var finds = [{
        'name': 'JAMIE H.LEE',
    }, {
        'name': 'TRAN LE'
    }, {
        'name': 'ELIZABETH SETTE'
    },{
        'name': 'RAVIDER SIGH'
    },{
        'name':'WINNIE YEUNG'
    },{
        'name':'PETER MOORE'
    }];
    res.render('frontend/pages/find', {
        finds: finds
    });
};

exports.forum = function(req, res) {
    res.render('frontend/pages/forum');
};

exports.profile = function(req, res) {
    res.render('frontend/pages/profile');
};

exports.tutorial = function(req, res) {
    var tutors = [{
        'name': '3Cs FRAMEWORK',
        'content': 'One of the most important framework help you get a general understanding of the industry'
    }, {
        'name': '4Ps FRAMEWORK',
        'content': 'One of the most important framework help you get a general understanding of the industry'
    }, {
        'name': 'FORTER FIVE FORCES',
        'content': 'One of the most important framework help you get a general understanding of the industry'
    }]
    res.render('frontend/pages/tutorial', {
        tutors: tutors
    });
};
