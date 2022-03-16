import AbstractTodoService from '../../common/services/todoService';
import Todo from '../../common/models/todo';
import { FindOneOptions, getRepository } from 'typeorm';
import User from '../../common/models/user';
import { ResponseError } from '../../common/exceptions/responseError';
import { TodoDto } from '../../common/dtos/TodoDto';

class TodoService extends AbstractTodoService {
    async findTodo(todo: any): Promise<Todo|undefined> {
        return getRepository(Todo).findOne({ id: todo.id, user: todo.user });
    }

    async create(todoDto: TodoDto) {
        const repository = getRepository(Todo);
        const todo = repository.create(todoDto);

        await repository.save(todo);

        return this.clearTodo(todo);
    }

    async list(filter: { limit: number, offset: number, late: boolean, user: User }) {
        const { limit = 100, offset = 0, late = false, user } = filter;

        const queryBuilder = getRepository(Todo)
            .createQueryBuilder('t')
            .innerJoinAndMapOne('users', 'users', 'u', 't.userId = u.id')
            .where(`t.userId = ${user.id}`)
            .limit(limit)
            .offset(offset);

        if (late) {
            queryBuilder.where(`t.dueDate < '${new Date().toISOString()}'`)
        }

        const todos = await queryBuilder.getRawAndEntities();

        return this.clearRawTodos(todos);
    }

    async get(filter: { id: number, user: User }) {
        const { id, user } = filter;

        const options = { where: { id, user: { id: user.id } } } as FindOneOptions<Todo>;

        const todo = await getRepository(Todo).findOne(options);

        if (!todo) {
            throw ResponseError.TODO_NOT_FOUND;
        }

        return this.clearTodo(todo);
    }
}

const instance = new TodoService();
export default instance;
