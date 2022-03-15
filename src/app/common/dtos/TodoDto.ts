import User from '../models/user';

export interface TodoDto {
    createdAt: Date|string;
    description: string;
    dueDate: Date|string;
    id?: number;
    status: string;
    title: string;
    updatedAt: Date|string;
    user?: User;
}
