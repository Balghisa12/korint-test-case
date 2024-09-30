import { Claims } from 'src/claims/claims.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @OneToMany(() => Claims, (claims) => claims.users)
  claims: Claims[];
}
