var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

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

describe('generateLocationMessage function operation', () => {

    it('should generate correct location object', () => {
        var lat = '36';
        var long = '26';
        var user = 'Ece';
        var url = `https://www.google.com.tr/maps?q=${lat},${long}`;
        var res = generateLocationMessage(user, lat, long);
        expect(res.from).toBe(user);
        expect(res.url).toBe(url);
        expect(typeof res.createdAt).toBe('number');
    });
});