import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SecurityModule } from './security/security.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from './users/model/user.model';
import { KeyModel } from './security/model/key.model';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './transform.interceptor';
import { ErrorsInterceptor } from './errors.interceptor';
import { FileModule } from './file/file.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule, UsersModule, SecurityModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'ls-560afc17c7edd1842038e3fbd47d464cbc449bf3.cadzrzf9bfop.ap-southeast-1.rds.amazonaws.com',
      port: 3306,
      username: 'dbmasteruser',
      password: 'sY#duP7^[Oz!Gk+0F4$yC+M5Md,2<&C3',
      database: 'SS_DB',
      entities: [User,KeyModel],
      synchronize: true,
      autoLoadEntities: true,
    }),
    FileModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,

    },
    AppService
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
