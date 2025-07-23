import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from '../dtos/dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // Registrar usuário com ou sem arquivo
  async registerUser(userData: CreateUserDto, file?: Express.Multer.File) {
    const user = this.userRepository.create({
      ...userData,
      faceFilePath: file ? file.path : undefined,
      createdAt: new Date(),
    });
    await this.userRepository.save(user);
    return {
      user,
      message: 'Usuário Registrado!'
    };
  }
}
 