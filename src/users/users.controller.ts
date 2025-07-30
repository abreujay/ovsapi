import { Controller, Post, Get, UploadedFile, UseInterceptors, Body,Patch, Param, Delete} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UsersService } from './users.service';
import { CreateUserDto } from '../dtos/dtos/create-user.dto';
import { UpdateUserDto } from 'src/dtos/dtos/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
      },
    }),
  }))
  async registerUser(
    @Body() createUserDto: CreateUserDto,
    @UploadedFile() file: Express.Multer.File
  ) {
    return await this.usersService.registerUser(createUserDto, file);
  }

  @Get('get-all')
  async getAll() {
    return await this.usersService.getAll();
  }

  @Patch('update/:id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + extname(file.originalname));
      },
    }),
  }))
  async updateUser(
    @Param('id') id: string,
    @Body() userData: UpdateUserDto,
    @UploadedFile() file?: Express.Multer.File
  ) {
    return await this.usersService.update(id, userData, file);
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.usersService.delete(id);
  }
}