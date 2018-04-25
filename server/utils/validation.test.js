const expect = require('expect');

var {isRealString} = require('./validation');

describe('isRealString method will be tested', () => {

    it('should reject non-string values', () => {
       var name = 9;
       var res = isRealString(name);
       expect(res).toBe(false);
    });

    it('should reject string with all of it is spaces', () => {
       var name = '      ';
       var res = isRealString(name);
       expect(res).toBe(false);
    });

    it('should allow string if it is valid', () => {
       var name = '   Ece Ayan   ';
       var res = isRealString(name);
       expect(res).toBe(true);
    });
});