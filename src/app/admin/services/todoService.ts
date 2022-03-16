import AbstractTodoService from '../../common/services/todoService';
import Todo from '../../common/models/todo';
import { getRepository } from 'typeorm';
import { ResponseError } from '../../common/exceptions/responseError';

class TodoService extends AbstractTodoService {
    async findTodo(todo: any): Promise<Todo|undefined> {
        return getRepository(Todo).findOne({ id: todo.id });
    }

    async list(filter: { limit: number, offset: number, late: boolean }) {
        const { limit = 100, offset = 0, late = false } = filter;

        const queryBuilder = getRepository(Todo)
            .createQueryBuilder('t')
            .innerJoinAndMapOne('users', 'users', 'u', 't.userId = u.id')
            .limit(limit)
            .offset(offset);

        if (late) {
            queryBuilder.where(`t.dueDate < '${new Date().toISOString()}'`)
        }

        const todos = await queryBuilder.getRawAndEntities();

        return this.clearRawTodos(todos);
    }

    async get(filter: { id: number }) {
        const todo = await getRepository(Todo).findOne({ where: { id: filter.id } });

        if (!todo) {
            throw ResponseError.TODO_NOT_FOUND;
        }

        return this.clearTodo(todo);
    }
}

const instance = new TodoService();
export default instance;
