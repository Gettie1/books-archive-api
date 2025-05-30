import { Column, OneToOne, PrimaryGeneratedColumn, Relation } from 'typeorm';

import { User } from '../../users/entities/user.entity';

export class Profile {
  @PrimaryGeneratedColumn()
  id: string;
  @Column({ nullable: true })
  bio?: string;
  @Column({ nullable: true })
  avatar?: string;
  @Column({ type: 'date', nullable: true })
  dateOfBirth?: Date;
  @Column({ nullable: true })
  location?: string;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date = new Date();
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  @OneToOne(() => User, (user) => user.profile)
  user: Relation<User>;
}
