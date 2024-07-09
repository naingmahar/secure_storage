import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    BadGatewayException,
    CallHandler,
    BadRequestException,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Observable, throwError } from 'rxjs';
  import { catchError } from 'rxjs/operators';
  
  @Injectable()
  export class ErrorsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      return next
        .handle()
        .pipe(
          catchError(err => {
            // console.log("Error",err)
            return throwError(() => new HttpException({error:err.message||"Something went wrong.",status:HttpStatus.BAD_REQUEST},HttpStatus.BAD_REQUEST))
        }),
        );
    }
  }
  