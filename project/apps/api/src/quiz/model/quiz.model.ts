import { Admin } from 'src/admin/model/admin.model';
import { Category } from 'src/category/model/category.model';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class Quiz {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  ans: string;

  @Column({nullable:true})
  q1: string;

  @Column({nullable:true})
  q2: string;

  @Column({nullable:true})
  q3: string;

  @Column({nullable:true})
  q4: string;

  @Column({nullable:true})
  q5: string;
  
  @Column({nullable:true})
  q6: string;

  @Column({nullable:true})
  image: string;

  @Column({default:0})
  category: number;
  
  @Column({default:true})
  isTesting: boolean;

  @ManyToOne(type=>Admin,(key)=>key.id)
  @JoinColumn({ name: "admin"})
  admin: Admin;
}