import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import User from './user';
import moment from 'moment';

@Entity('todos')
class Todo {
    @Column('datetime')
    createdAt: Date|string;

    @Column()
    description: string;

    @Column('datetime')
    dueDate: Date|string;

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    status: string

    @Column()
    title: string;

    @Column('datetime')
    updatedAt: Date|string;

    @ManyToOne(type => User, user => user.todos)
    user: User;

    @BeforeInsert()
    beforeInsert() {
        this.createdAt = this.dateFormat(new Date());
        this.updatedAt = this.dateFormat(new Date());
    }

    @BeforeUpdate()
    beforeUpdate() {
        this.updatedAt = this.dateFormat(new Date());

        if (this.createdAt instanceof Date) {
            this.createdAt = this.dateFormat(this.createdAt);
        }

        if (this.dueDate instanceof Date) {
            this.dueDate = this.dateFormat(this.dueDate);
        }
    }

    dateFormat(date: Date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    }
}

export default Todo;
