import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { UploadFileDTO } from './dto/upload.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Files } from './model/file.model';
import { Repository } from 'typeorm';

@Injectable()
export class FileService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Files)
    private fileRepository: Repository<Files>,
  ) {}

  async getUrlFromKey(key) {
    const s3 = new S3({endpoint:this.configService.get('AWS_END_POINT')});
    const params = {
      Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
      Key: key,
      Expires: 60 * 1440,
    };

    try {
      const url = await new Promise((resolve, reject) => {
        s3.getSignedUrl('getObject', params, (err, url) => {
          err ? reject(err) : resolve(url);
        });
      });
      // console.log(url);

      return { url, key };
    } catch (err) {
      if (err) {
        //   console.log(err);
        return Promise.reject(err);
      }
    }
  }
  async uploadPublicFile(obj: UploadFileDTO) {
    const s3 = new S3({endpoint:this.configService.get('AWS_END_POINT')});
    const key =
      new Date().getMilliseconds().toString() +
      Math.round(Math.random() * 1000000).toString();

    const type = obj.type ? obj.type.split('/')[1] : 'jpg';
    const keyString = obj.key ? obj.key : key;

    let confirmKey = `${obj.path}/${keyString}.${type}`;

    let params = {
      Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
      Key: confirmKey,
      Expires: 60 * 500,
      ContentType: obj.type ? obj.type : 'image/jpg',
      ACL: 'public-read'
    };

    try {
      const url = await new Promise((resolve, reject) => {
        s3.getSignedUrl('putObject', params, (err, url) => {
          err ? reject(err) : resolve(url);
        });
      });
      //   console.log(url);

      return { url, key: confirmKey };
    } catch (err) {
      if (err) {
        // console.log(err);
        return Promise.reject(err);
      }
    }
  }


  async uploadFile(obj: UploadFileDTO) {
    const s3 = new S3();

    const key =
      new Date().getMilliseconds().toString() +
      Math.round(Math.random() * 1000000).toString();

    const type = obj.type ? obj.type.split('/')[1] : 'jpg';
    const keyString = obj.key ? obj.key : key;

    let confirmKey = `${obj.path}/${keyString}.${type}`;

    let params = {
      Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
      Key: confirmKey,
      Expires: 60 * 500,
      ContentType: obj.type ? obj.type : 'image/jpg',
      ACL: 'public-read'
    };

    try {
      const url = await new Promise((resolve, reject) => {
        s3.getSignedUrl('putObject', params, (err, url) => {
          err ? reject(err) : resolve(url);
        });
      });
      //   console.log(url);

      return { url, key: confirmKey };
    } catch (err) {
      if (err) {
        // console.log(err);
        return Promise.reject(err);
      }
    }
  }

  fileUploadDirectlyOption() {
    return  {
      Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
      ACL: "public-read",
    }
  }

  fileUpload = (file: Express.Multer.File,path:string,defaultKey?:string) => {

    const s3 = new S3();
    const { filename, mimetype, size, buffer } = file
    const type = mimetype.split('/')[1] ;

    const key =new Date().getMilliseconds().toString() +
                Math.round(Math.random() * 1000000).toString();
    const keyString = defaultKey ? defaultKey : key;

    let confirmKey = `${path}/${keyString}`;


    return new Promise((res,rej)=>{
        s3.putObject({
            Body:buffer,
            Bucket:this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
            Key:confirmKey,
            ContentType:mimetype
        },(err,data)=>{
            if(err) return rej(err);
            if(data) return res({
              url:`${this.configService.get('AWS_END_POINT')}/${confirmKey}`
            })
        })
    })  
  }

  saveFile= (name:string,path:string,userId:String) =>{
    this.fileRepository.save({name,path,uId:userId.toString()})
  }

  getAllMyFiles= async (userId:String) =>{
    return this.fileRepository.findBy({uId:userId.toString()})
  }

}