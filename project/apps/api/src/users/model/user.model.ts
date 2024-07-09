import { KeyModel } from 'src/security/model/key.model';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  publicKey: string;

  @OneToOne(type=>KeyModel,(key)=>key.publicKey)
  @JoinColumn({ name: "publicKey"})
  keys: KeyModel;
}