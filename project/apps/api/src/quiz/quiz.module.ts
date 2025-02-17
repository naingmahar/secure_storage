import { Module } from '@nestjs/common';
import { QuizController } from './quiz.controller';
import { QuizService } from './quiz.service';
import { Quiz } from './model/quiz.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([Quiz])],
  controllers: [QuizController],
  providers: [QuizService]
})
export class QuizModule {}
