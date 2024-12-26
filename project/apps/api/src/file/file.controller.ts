import {
    Controller,
    Get,
    Res,
    Query,
    HttpStatus,
    Post,
    Body,
    UseInterceptors,
    UploadedFile,
    Req,
    UseGuards,
  } from '@nestjs/common';
  import { FileService } from './file.service';
  import * as fs from 'fs';
  import Axios from 'axios';
  import { UploadFileDTO } from './dto/upload.dto';
  import { ApiTags } from '@nestjs/swagger';
  import { ConfigService, S3 } from 'aws-sdk';
  import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthUser } from 'src/auth/auth.decoder';
import { IAuth } from 'src/auth/type/auth';
  
  @Controller('file')
  @UseGuards(AuthGuard)
  @ApiTags("File Upload")
  export class FileController {
    constructor(private fileService: FileService) {}
  
    // @UseGuards(JwtAuthGuard)
    @Get('/upload')
    async getUploadUrl(@Res() res, @Query() obj: UploadFileDTO) {
      try {
        const url = await this.fileService.uploadFile(obj);
        return res.status(HttpStatus.OK).json({
          message: 'Success',
          res: url,
        });
      } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: error.message,
          status: false,
        });
      }
    }
  
    @Get()
    async getImageUrl(@Res() res, @Query() obj: { key: string }) {
      try {
        const response = await this.fileService.getUrlFromKey(obj.key);
        return res.status(HttpStatus.OK).json({
          message: 'Success',
          res: response,
        });
      } catch (error) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          message: error.message,
          status: false,
        });
      }
    }
  
  
    @Post()
    async uploadImage(@Res() res, @Body() obj: { url: string; path: string }) {
      const testImg =
        '/Users/naingmahar/naingmahar/thine-kabar/backend/res/test.jpg';
      let file = await fs.readFileSync(testImg);
  
      Axios.put(obj.url, file, {
        headers: {
          'Content-Type': 'image/jpg',
        },
      })
        .then(data => console.log('Axios', data.data))
        .catch(error => console.log('Error', error));
    }
  
    @Post("test")
    async uploadTTestImageDirectly(){
  
      const testImg =
      '/Users/naingmahar/naingmahar/thine-kabar/backend/res/test.jpg';
    let file = await fs.readFileSync(testImg);
  
      const params = 
      {
          Bucket: "bucket-xfojlp",
          Key: String("testing"),
          Body: file,
          ACL: "public-read",
          ContentType: 'image/jpg',
      };
  
      let s3 = new S3();
      s3.upload(params).promise().then(data=>{
        console.warn("data",data)
      }).catch(error=>console.warn(error))
    }
  
  
  //  @Post("upload")
  //  @UseInterceptors(FileInterceptor('file'))
  //  async uploadFile(@Res() res, @Query() obj: UploadFileDTO,@UploadedFile() file: Express.Multer.File ) {
  //   console.warn(file)
  //     const params = {...this.fileService.fileUploadDirectlyOption(),...{
  //         Key: `${obj.path}/${obj.key}`,
  //         Body: file,
  //         ContentType: obj.type,
  //     }}
  
  //     let s3 = new S3();
  
  //     try {
  //       const response = s3.upload(params).promise();
  //       return res.status(HttpStatus.OK).json({
  //         message: 'Success',
  //         res: response,
  //       });
  //     } catch (error) {
  //       return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
  //         message: error.message,
  //         status: false,
  //       });
  //     }
  //   }
  
    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async putFile(@Req() req,@UploadedFile() file, @Body() body:UploadFileDTO, @AuthUser() authUser: IAuth) {
      try { 
        const serviceRes = await this.fileService.fileUpload(file,body.path,body.key);
        // this.fileService.saveFile(body.key,body.path,authUser.userId)
        return serviceRes;
      } catch (error) {
        throw new Error(error)
      }
    }

    @Get('myfile')
    async myFile(@Req() req, @AuthUser() authUser: IAuth) {
      try { 
        let data = await this.fileService.getAllMyFiles(authUser.userId)
        return data;
      } catch (error) {
        throw new Error(error)
      }
    }
  }
  
  
  
  