import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';

@Entity()
export class Files {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path:string;

  @Column()
  name: string;

  @Column()
  uId: string;
}