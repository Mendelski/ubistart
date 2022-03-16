import { getRepository } from 'typeorm';
import User from '../models/user';
import { ResponseError } from '../exceptions/responseError';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserDto } from '../dtos/UserDto';
import validator from 'email-validator';

class UserService {
    async register(data: { email: string, password: string, role: string }) {
        const {
            email,
            password,
            role,
        } = data;

        if (!email || !password || !role) {
            throw ResponseError.INVALID_PARAMS;
        }

        if (!validator.validate(email)) {
            throw ResponseError.INVALID_EMAIL;
        }

        const repository = getRepository(User);

        const userExists = await repository.findOne({ where: { email } });

        if (userExists) {
            throw ResponseError.USER_ALREADY_EXISTS;
        }

        const user = repository.create({
            email,
            password,
            role,
        });

        await repository.save(user);

        const userDto = user as UserDto;

        delete userDto.password;

        return userDto;
    }

    async login(data: any) {
        const {
            email,
            password,
        } = data;

        const user = (await getRepository(User).findOne({ where: { email } })) as UserDto;

        if (!user) {
            throw ResponseError.INVALID_CREDENTIALS;
        }

        const isValidPassword = await bcrypt.compare(password, user.password!);

        if (!isValidPassword) {
            throw ResponseError.INVALID_CREDENTIALS;
        }

        delete user.password;

        return jwt.sign({ ...user }, process.env.JWT_SECRET ?? '', { expiresIn: '1d' });
    }
}

const instance = new UserService();
export default instance;
