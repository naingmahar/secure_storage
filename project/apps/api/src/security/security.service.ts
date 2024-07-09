import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KeyModel } from './model/key.model';

@Injectable()
export class SecurityService {

    constructor(
        @InjectRepository(KeyModel)
        private keyRepository: Repository<KeyModel>,
      ) {}

    generateUUID() { // Public Domain/MIT
        var d = new Date().getTime();//Timestamp
        var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16;//random number between 0 and 16
            if (d > 0) {//Use timestamp until depleted
                r = (d + r) % 16 | 0;
                d = Math.floor(d / 16);
            } else {//Use microseconds since page-load if supported
                r = (d2 + r) % 16 | 0;
                d2 = Math.floor(d2 / 16);
            }
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }

    private decimalToHexString(number:number) {
        if (number < 0) {
            number = 0xFFFFFFFF + number + 1;
        }

        return number.toString(16).toUpperCase();
    }


    getnerateId() {
        const date = Date.now();
        const random = Math.floor(Math.random()*100000)
        return this.decimalToHexString(parseInt(`${date}${random}`))
    }

    async createSecurityKey(userAgent:string){
        let param = {privateKey:this.generateUUID(),publicKey:this.getnerateId(),userAgent}
        try {
            let dbRes = await this.keyRepository.save(param)
            return dbRes
        } catch (error) {
            throw error
        }
      }
}
