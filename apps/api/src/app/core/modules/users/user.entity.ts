import * as bcrypt from 'bcrypt';

import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string; // USER_ID

  @Column({
    unique: true,
  })
  readonly name: string;

  @Column({ type: 'varchar', length: 70, nullable: false })
  password: string;

  //TODO: change that into an enum
  @Column({ type: 'varchar', length: '50', nullable: false })
  role: string;

  @BeforeInsert()
  async hashPassword() {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  constructor(userId: string, name: string, role: string, pass?: string) {
    this.id = userId;
    this.name = name;
    this.password = pass;
    this.role = role;
  }
}
