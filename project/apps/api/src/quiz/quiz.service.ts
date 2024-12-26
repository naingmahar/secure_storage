import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Quiz } from './model/quiz.model';
import { Repository } from 'typeorm';
import { CreateQuizDto, QuizDto } from './dto/quiz.dto';
import { IQuiz } from './interface/quiz';

@Injectable()
export class QuizService {

  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
  ) {}

  findAll(param:any,skip:number): Promise<Quiz[]> {
    return this.quizRepository.find({where:param,skip:0,take:10});
  }

  findById(id: number): Promise<Quiz | null> {
    return this.quizRepository.findOneBy({ id });
  }

  async createQuiz(quiz:IQuiz):Promise<IQuiz & Quiz>{
    const res = (await this.quizRepository.save(quiz));
    return res
  }


  async findOne(id: number): Promise<Quiz | undefined> {

    let data = await this.quizRepository.find({
      relations:["id"],
      where:{id}
    }) 
    
    console.log("Data",data)
    return data[0] || undefined
    //  ({publicKey});
  }
}
