import { BeforeInsert, BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { hash } from '../../../utils/bcrypt';
import Todo from './todo';

@Entity('users')
class User {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    role: string;

    @OneToMany(type => Todo, todo => todo.user)
    todos: Todo[];

    @BeforeInsert()
    @BeforeUpdate()
    hashPassword() {
        if (this.password) {
            this.password = hash(this.password);
        }
    }
}

export default User;
