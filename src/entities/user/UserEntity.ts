import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { IJwtCipher } from './interfaces';

@Entity("user")
export class UserEntity extends BaseEntity {
  // Columns
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  bio: string;
  @Column({ nullable: false, unique: true })
  email: string;
  @Column()
  image: string;
  @Column({ nullable: false })
  password: string;
  @Column({ nullable: false, unique: true })
  username: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  // Dependencies
  private cipher: IJwtCipher

  authorize(cipher: IJwtCipher) {
    this.cipher = cipher;
  }

  get token(): string {
    if (!this.cipher) {
      return null;
    } else {
      return this.cipher.tokenize({
        id: this.id,
        username: this.username,
        password: this.password,
      });
    }
  }
}
