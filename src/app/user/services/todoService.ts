import { FindOneOptions, getRepository } from 'typeorm';
import Todo from '../../common/models/todo';
import { TodoDto } from '../../common/dtos/TodoDto';
import User from '../../common/models/user';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';
import { format } from '../../../utils/date';
import { ResponseError } from '../../common/exceptions/responseError';
import { TodoStatus } from '../../common/enums/todoEnum';

class TodoService {
    async create(todoDto: TodoDto) {
        const repository = getRepository(Todo);

        const todo = repository.create(todoDto);

        await repository.save(todo);

        return this.clearTodo(todo);
    }

    async update(todo: Partial<Todo>) {
        const repository = getRepository(Todo);

        const dbTodo = await repository.findOne({ id: todo.id, user: todo.user });

        if (!dbTodo) {
            throw ResponseError.TODO_NOT_FOUND.addDetails({ id: todo.id });
        }

        if (dbTodo.status === TodoStatus.DONE) {
            throw ResponseError.TODO_FINISHED;
        }

        const updatedTodo = { ...dbTodo, ...todo } as Todo;

        console.log(dbTodo, todo, updatedTodo);

        await repository.update({ id: updatedTodo.id }, updatedTodo);

        return this.clearTodo(updatedTodo);
    }

    async list(filter: { limit: number, offset: number, user: User }) {
        const { limit = 100, offset = 0, user } = filter;

        const options = {
            skip: offset,
            take: limit,
            user,
        } as FindManyOptions<Todo>;

        const todos = await getRepository(Todo).find(options);

        return todos.map(this.clearTodo);
    }

    async get(filter: { id: number, user: User }) {
        const { id, user } = filter;

        const options = {
            id,
            user,
        } as FindOneOptions<Todo>;

        const todo = await getRepository(Todo).findOne(options);

        if (!todo) {
            throw ResponseError.TODO_NOT_FOUND.addDetails({ id });
        }

        return this.clearTodo(todo);
    }

    clearTodo(todo: Todo) {
        const todoDto: TodoDto = { ...todo };
        delete todoDto.user;

        todoDto.createdAt = format(todoDto.createdAt);
        todoDto.dueDate = format(todoDto.dueDate);
        todoDto.updatedAt = format(todoDto.updatedAt);

        return todoDto;
    }
}

const instance = new TodoService();
export default instance;
