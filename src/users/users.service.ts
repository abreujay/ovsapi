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

  
    //registrar usuario
    async registerUser(userData:CreateUserDto){

        const user = this.userRepository.create(userData)
        await this.userRepository.save(user)
        return {
            user,
            message: "Usuário Registrado!"
        }
    }

}
 