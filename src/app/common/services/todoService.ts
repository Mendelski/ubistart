import { getRepository } from 'typeorm';
import Todo from '../models/todo';
import { TodoDto } from '../dtos/TodoDto';
import { format } from '../../../utils/date';
import { ResponseError } from '../exceptions/responseError';
import { TodoStatus } from '../enums/todoEnum';

export default class TodoService {
    async update(todo: Partial<Todo>) {
        const repository = getRepository(Todo);

        const dbTodo = await this.findTodo(todo);

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

    // @ts-ignore
    async findTodo(todo: any): Promise<Todo|undefined> {};

    clearTodo(todo: Todo) {
        const todoDto: TodoDto = { ...todo };

        if (todoDto.user) {
            todoDto.user = {
                email: todoDto.user.email,
            };
        }

        todoDto.createdAt = format(todoDto.createdAt);
        todoDto.dueDate = format(todoDto.dueDate);
        todoDto.updatedAt = format(todoDto.updatedAt);

        return todoDto;
    }

    clearRawTodos(rawTodos: { entities: Todo[], raw: any[] }) {
        const todos = rawTodos.entities.map(todo => {
            return {
                ...todo,
                user: {
                    email: rawTodos.raw.find(todoRaw => todoRaw.t_id == todo.id)?.u_email,
                }
            };
        }) as Todo[];

        return todos.map(this.clearTodo);
    }
}
