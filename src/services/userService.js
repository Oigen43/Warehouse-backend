'use strict';

const userRepository = require('../repositories/userRepository');

class UserService {
    constructor({ userRepository }) {
        this.userRepository = userRepository;
    }

    async get(page, perPage) {
        const data = await this.userRepository.get(page, perPage);

        if (!data) {
            return [];
        }
        return data;
    }

    async create(user) {
        const data = await this.userRepository.create(user);
        return data;
    }

    async update(user) {
        const data = await this.userRepository.update(user);
        return data;
    }

    async remove(user) {
        const data = await this.userRepository.remove(user);
        return data;
    }
}

module.exports = new UserService({userRepository});
