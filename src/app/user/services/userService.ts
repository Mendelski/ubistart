import { getRepository } from 'typeorm';
import User from '../../common/models/user';
import { UserRole } from '../../common/enums/userEnum';
import { ResponseError } from '../../common/exceptions/responseError';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserDto } from '../../common/dtos/UserDto'

class UserService {
    async register(data: any) {
        const { email, password } = data;

        const repository = getRepository(User);

        const userExists = await repository.findOne({ where: { email } });

        if (userExists) {
            throw ResponseError.USER_ALREADY_EXISTS;
        }

        const user = repository.create({
            email,
            password,
            role: UserRole.USER,
        });

        await repository.save(user);

        return user;
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

        return jwt.sign(user as UserDto, process.env.JWT_SECRET ?? '', { expiresIn: '1d' });
    }
}

const instance = new UserService();
export default instance;
