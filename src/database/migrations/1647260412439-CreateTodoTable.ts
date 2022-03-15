import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateTodoTable1647260412439 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'todos',
            columns: [
                {
                    name: 'createdAt',
                    type: 'datetime',
                }, {
                    name: 'description',
                    type: 'varchar',
                }, {
                    name: 'dueDate',
                    type: 'datetime',
                }, {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                }, {
                    name: 'status',
                    type: 'varchar',
                }, {
                    name: 'title',
                    type: 'varchar',
                }, {
                    name: 'updatedAt',
                    type: 'datetime',
                }, {
                    name: 'userId',
                    type: 'int',
                },
            ],
        }));

        const foreignKey = new TableForeignKey({
            columnNames: ['userId'],
            onDelete: 'CASCADE',
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
        });

        await queryRunner.createForeignKey('todos', foreignKey);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('todos');
    }
}
