"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mockingoose_1 = __importDefault(require("mockingoose"));
var Book_1 = require("../../src/models/Book");
describe('test mongoose User model', function () {
    test('should return the doc with findById', function () {
        var returnValue = {
            _id: '507f191e810c19729de860ea',
            name: 'name',
            author: 'author'
        };
        (0, mockingoose_1.default)(Book_1.Book).toReturn(returnValue, 'findOne');
        return Book_1.Book.findById({ _id: '507f191e810c19729de860ea' }).then(function (doc) {
            expect(JSON.parse(JSON.stringify(doc))).toMatchObject(returnValue);
        });
    });
});
