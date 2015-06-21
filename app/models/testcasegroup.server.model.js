'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

/**
 * TestCaseGroupSchema Schema
 */
var TestCaseGroupSchema = new Schema({
    name: { // tên bộ câu hỏi
        type: String,
        required: true
    },
    author: { // tác giả bộ câu hỏi
        type: String,
        required: true
    },
    note: { // mô tả bộ câu hỏi
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

mongoose.model('TestCaseGroup', TestCaseGroupSchema);
