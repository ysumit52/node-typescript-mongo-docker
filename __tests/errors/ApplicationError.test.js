"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application_error_1 = require("../../src/errors/application-error");
describe('ApplicationError test suite', function () {
    test('sets default error message', function () {
        var error = new application_error_1.ApplicationError();
        expect(error.message).toBe('ApplicationError');
    });
    test('sets correct message', function () {
        var message = 'error message';
        var error = new application_error_1.ApplicationError(message);
        expect(error.message).toBe(message);
    });
    test('sets 500 as default status code', function () {
        var message = 'error message';
        var error = new application_error_1.ApplicationError(message);
        expect(error.status).toBe(500);
    });
    test('sets correct status', function () {
        var message = 'error message';
        var status = 400;
        var error = new application_error_1.ApplicationError(message, status);
        expect(error.status).toBe(status);
    });
});
