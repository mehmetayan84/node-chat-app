class Users {
    constructor() {
        this.users = [];
    }

    addUser(id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    removeUser(id) {
        var user = this.users.filter((user) => user.id === id)[0];
        if(user) {
            var index = this.users.indexOf(user);
            this.users.splice(index, 1);
        }
        return user;
    }

    getUserList(room) {
        var users = this.users.filter((user) => user.room === room);
        var usersArray = users.map((user) => user.name);
        return usersArray;
    }
}

module.exports = {Users};