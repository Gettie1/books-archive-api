import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Profile } from '../../profiles/entities/profile.entity';
import { Bookreview } from 'src/bookreviews/entities/bookreview.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number; // Unique identifier (UUID)
  @Column()
  name: string; // Unique user name
  @Column({ unique: true })
  email: string; // User's email address (unique)
  @Column({ select: false }) // Exclude from queries by default
  password: string; // Hashed password
  @Column({ default: true })
  isActive?: boolean = true;
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date = new Date();
  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date = new Date();

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  profile: Relation<Profile>; // Establishes a one-to-one relationship with Profile entity
  @OneToMany(() => Bookreview, (bookReview) => bookReview.user)
  bookReview: Relation<Bookreview>;
}
