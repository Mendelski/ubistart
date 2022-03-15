import bcrypt from 'bcryptjs';

export const hash = (value: string) => {
    return bcrypt.hashSync(value, 8);
};
