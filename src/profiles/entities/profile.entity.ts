import {
  Column,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { Author } from 'src/authors/entities/author.entity';
import { User } from '../../users/entities/user.entity';
import { Entity } from 'typeorm/decorator/entity/Entity';
export enum Role {
  ADMIN = 'admin',
  GUEST = 'guest',
  AUTHOR = 'author',
  REVIEWER = 'reviewer',
}
@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true })
  bio?: string;
  @Column({ nullable: true })
  avatar?: string;
  @Column({ type: 'date', nullable: true })
  dateOfBirth?: string;
  @Column({ nullable: true })
  location?: string;
  @Column({ type: 'enum', enum: Role, default: Role.GUEST })
  role: Role;
  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date = new Date();
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date = new Date();
  @OneToOne(() => User, (user) => user.profile)
  user: Relation<User>;
}
