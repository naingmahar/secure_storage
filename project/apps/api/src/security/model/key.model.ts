import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class KeyModel {

  @PrimaryColumn()
  publicKey: string;

  @Column()
  privateKey:string;

  @Column()
  userAgent: string;
}