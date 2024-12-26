import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './model/admin.model';
import { Repository } from 'typeorm';
import { IAdmin } from './interface/admin';
import { CreateAdminDto } from './dto/admin.dto';

@Injectable()
export class AdminService {

  constructor(
    @InjectRepository(Admin)
    private usersRepository: Repository<Admin>,
  ) {}

  findAll(): Promise<Admin[]> {
    return this.usersRepository.find();
  }

  findById(id: number): Promise<Admin | null> {
    return this.usersRepository.findOneBy({ id });
  }

  createUser(user:CreateAdminDto){
    this.usersRepository.save(user);
  }


  async findOne(email: string): Promise<Admin | undefined> {

    console.log("PUBLIC KEY",email)

    let data = await this.usersRepository.find({
      where:{email}
    }) 
    
    console.log("Data",data)
    return data[0] || undefined
    //  ({publicKey});
  }
}