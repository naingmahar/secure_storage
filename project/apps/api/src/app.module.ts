import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from './admin/admin.module';
import { QuizModule } from './quiz/quiz.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Admin } from './admin/model/admin.model';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './transform.interceptor';
import { ErrorsInterceptor } from './errors.interceptor';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'ls-560afc17c7edd1842038e3fbd47d464cbc449bf3.cadzrzf9bfop.ap-southeast-1.rds.amazonaws.com',
      port: 3306,
      username: 'dbmasteruser',
      password: 'sY#duP7^[Oz!Gk+0F4$yC+M5Md,2<&C3',
      database: 'SYH_DB',
      entities: [Admin],
      synchronize: true,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    AdminModule, QuizModule,AuthModule,FileModule, CategoryModule],
  controllers: [AppController],
  providers: [
      {
        provide: APP_INTERCEPTOR,
        useClass: TransformInterceptor,
      },
      {
        provide: APP_INTERCEPTOR,
        useClass: ErrorsInterceptor,
  
      }
    ,AppService],
})
export class AppModule {}
