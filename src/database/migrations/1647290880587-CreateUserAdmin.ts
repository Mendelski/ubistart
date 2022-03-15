import { getRepository, MigrationInterface, QueryRunner } from 'typeorm';
import User from '../../app/common/models/user';
import { UserRole } from '../../app/common/enums/userEnum';

export class CreateUserAdmin1647290880587 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const repository = getRepository(User);

        const admin = repository.create({
            email: 'admin@admin.com',
            password: 'admin',
            role: UserRole.ADMIN,
        });

        await repository.save(admin);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await getRepository(User).delete(1);
    }
}
