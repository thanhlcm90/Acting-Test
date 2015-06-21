'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    _ = require('lodash'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

/**
 * TestCase Schema
 */
var TestCaseSchema = new Schema({
    code: {
        type: Number,
        required: true
    },
    group: {
        type: ObjectId,
        ref: 'TestCaseGroup',
        required: true
    },
    type: {
        type: String,
        enum: ['begin_text', 'hint', 'answer', 'framework', 'infop', 'info', 'message'],
        required: true
    },
    state: {
        type: Number,
        default: 1,
        required: true
    },
    keywords: [{
        type: String,
        trim: true,
        lowercase: true,
        index: true
    }],
    parent_code: {
        type: Number,
        default: null
    },
    content: {
        type: String,
        default: null
    },
    reasoning: {
        type: String,
        default: null
    },
    user_created: {
        type: ObjectId,
        ref: 'User'
    },
    date_created: {
        type: Date,
        default: Date.now
    }
});

/**
 * Pre-save hook
 */
TestCaseSchema.pre('save', function(next) {
    if (this.keywords && this.keywords.length > 0) {
        for (var i = 0; i < this.keywords.length; i++) {
            this.keywords[i] = this.keywords[i].trim().toLowerCase();
        }
    }
    next();
});


mongoose.model('TestCase', TestCaseSchema);
