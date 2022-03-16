export default {
    type: 'mysql',
    host: process.env.DB_HOST ?? 'localhost',
    port: process.env.DB_PORT ?? 3306,
    username: process.env.DB_USERNAME ?? 'root',
    password: process.env.DB_PASSWORD ?? 'root',
    database: process.env.DB_DATABASE ?? 'test_ubistart',
    entities: [
        'src/app/common/models/*.ts',
    ],
    migrations: [
        'src/database/migrations/*.ts',
    ],
    cli: {
        migrationsDir: 'src/database/migrations',
        entityDir: 'src/app/common/models/*.ts',
    },
};