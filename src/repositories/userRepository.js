'use strict';

const fs = require('fs').promises;
const path = require('path');
const fullPath = path.join(__dirname, '../db/users.json');

class UserRepository {
    async get(page = 1, perPage = 10) {
        const data = await fs.readFile(fullPath);
        const users = JSON.parse(data);
        const filteredUsers = users.filter(item => item.deleted === false);

        const start = (page - 1) * perPage;
        const end = start + perPage;
        const pagedUsers = filteredUsers.slice(start, end);

        return {
            data: {
                users: pagedUsers,
                usersTotal: filteredUsers.length
            },
            done: true
        };
    }

    async create(user) {
        const data = await fs.readFile(fullPath);
        const users = JSON.parse(data);

        if (users.some(item => item.firstName === user.firstName)) {
            return {
                data: {
                    message: 'This user already exists'
                },
                done: true
            };
        }

        user.deleted = false;
        users.push(user);
        await fs.writeFile(fullPath, JSON.stringify(users));
        return {
            data: {
                message: 'User created'
            },
            done: true
        };
    }

    async update(user) {
        const data = await fs.readFile(fullPath);
        const users = JSON.parse(data);

        const index = users.findIndex(item => item.firstName === user.firstName);
        if (index === -1) {
            return {
              data: {
                  message: 'This user does not exists'
              },
              done: false
            };
        }

        user.deleted = false;
        users[index] = user;
        await fs.writeFile(fullPath, JSON.stringify(users));
        return {
            data: {
                message: 'User updated'
            },
            done: true
        };
    }

    async remove(user) {
        const data = await fs.readFile(fullPath);
        const users = JSON.parse(data);

        const index = users.findIndex(item => item.firstName === user.firstName);
        if (index === -1) {
            return {
                data: {
                    message: 'This user does not exists'
                },
                done: false
            };
        }

        users[index].deleted = true;
        await fs.writeFile(fullPath, JSON.stringify(users));
        return {
            data: {
                message: 'User deleted'
            },
            done: true
        };
    }
}

module.exports = new UserRepository();
