import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto, FindQuizDto } from './dto/quiz.dto';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthUser } from 'src/auth/auth.decoder';
import { IAuth } from 'src/auth/type/auth';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('quiz')
@ApiBearerAuth('Authorization')
export class QuizController {
    constructor(private quizService: QuizService) {}

    @UseGuards(JwtAuthGuard)
    @Post()
    @ApiOperation({ summary: 'Create Quiz' })
    register(@Body() createQuizDto:CreateQuizDto, @AuthUser() authUser: IAuth) {
      console.log("authUser",{...createQuizDto,...{admin:authUser.userId}})
      return this.quizService.createQuiz({...createQuizDto,...{admin:authUser.userId}});
    }

    @Get()
    @ApiOperation({ summary: 'Get Quiz' })
    getQuizzesByCategories(@Query() findQuizDto:FindQuizDto) {
      console.log("FIND",{category:parseInt(findQuizDto.category||"0")})
      return this.quizService.findAll({category:parseInt(findQuizDto.category||"0")},0);
    }
}
