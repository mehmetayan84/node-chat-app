const expect = require('expect');

const {Users} = require('./users');

describe('this should test users class and its methods', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Ece',
            room: 'Node'
        }, {
            id: '2',
            name: 'Mehmet',
            room: 'React'
        }, {
            id: '3',
            name: 'Julie',
            room: 'Node'
        }];
    });

    it('should add a user', () => {
        var users = new Users();
        var name = 'Ece';
        var room = 'Ayan';
        var id = '1234';
        var resUser = users.addUser(id, name, room);
        expect(users.users).toEqual([resUser]);
    });

    it('should return names of node course', () => {
       var userNames = users.getUserList('Node');
       expect(userNames.length).toBe(2);
       expect(userNames).toEqual(['Ece', 'Julie']);
    });

    it('should return names of react course', () => {
        var userNames = users.getUserList('React');
        expect(userNames.length).toBe(1);
        expect(userNames).toEqual(['Mehmet']);
    });

    it('should get the user', () => {
       var user = users.getUser('1');
       expect(user.name).toBe('Ece');
    });

    it('should not get the user', () => {
        var user = users.getUser('5');
        expect(user).toBeFalsy();
    });

    it('should delete the user', () => {
        var user = users.removeUser('2');
        expect(user.name).toBe('Mehmet');
        expect(users.users.length).toBe(2);
    });

    it('should not delete the user', () => {
        var user = users.removeUser('5');
        expect(user).toBeFalsy();
        expect(users.users.length).toBe(3);
    });

});