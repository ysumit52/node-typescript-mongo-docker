"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var supertest_1 = __importDefault(require("supertest"));
var app_1 = require("../src/app");
jest.mock('../src/models/Book');
describe('App Test', function () {
    test('GET /random-url should return 404', function (done) {
        (0, supertest_1.default)(app_1.app).get('/reset')
            .expect(404, done);
    });
    test('GET /book/all should return 401', function (done) {
        (0, supertest_1.default)(app_1.app).get('/api/book/all').expect(401, done);
    });
});
