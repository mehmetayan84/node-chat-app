var expect = require('expect');

var {generateMessage} = require('./message');

describe('getMessage function operation', () => {

    it('should generate and return a message', () => {
        var from = 'Ece';
        var text = 'Hey there';
        var res = generateMessage(from, text);
        expect(res.from).toBe(from);
        expect(res.text).toBe(text);
        expect(typeof res.createdAt).toBe('number');
    });
});