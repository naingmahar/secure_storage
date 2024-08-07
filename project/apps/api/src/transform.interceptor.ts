import { Injectable, NestInterceptor, ExecutionContext, CallHandler, HttpStatus, BadGatewayException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    return next.handle()
                .pipe(
                  map(data => ({ status:HttpStatus.OK,data,error:"" })),
                );
  }
}