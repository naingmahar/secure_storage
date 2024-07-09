
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './model/user.model';
import { Repository } from 'typeorm';
import IUser from '@repo/common';

// This should be a real class/interface representing a user entity

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  createUser(user:IUser){
    this.usersRepository.save(user);
  }


  async findOne(username: string): Promise<User | undefined> {

    console.log("PUBLIC KEY",username)

    let data = await this.usersRepository.find({
      relations:["keys"],
      where:{email:username}
    }) 
    
    console.log("Data",data)
    return data[0] || undefined
    //  ({publicKey});
  }
}