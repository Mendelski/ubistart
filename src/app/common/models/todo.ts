import { BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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

    @ManyToOne(() => User)
    user: User;

    @BeforeInsert()
    beforeInsert() {
        if (this.createdAt instanceof Date) {
            this.createdAt = this.dateFormat(this.createdAt);
        }

        if (this.dueDate instanceof Date) {
            this.dueDate = this.dateFormat(this.dueDate);
        }

        if (this.updatedAt instanceof Date) {
            this.updatedAt = this.dateFormat(this.updatedAt);
        }
    }

    dateFormat(date: Date) {
        return moment(date).format('YYYY-MM-DD HH:mm:ss');
    }
}

export default Todo;
