import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { CreateUserDto } from '../dtos/dtos/create-user.dto';
import { UpdateUserDto } from 'src/dtos/dtos/update-user.dto';

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
      message: 'Usuário Registrado!',
    };
  }

  async getAll() {
    return this.userRepository.find();
  }

  async update(id: string, userData: UpdateUserDto, file?: Express.Multer.File) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
      Object.assign(user, userData);

  // Se veio um novo arquivo, atualiza o caminho da foto
  if (file) {
    user.faceFilePath = file.path.replace(/\\/g, '/');
  }

  user.updatedAt = new Date();

  await this.userRepository.save(user);
  return {
    user,
    message: 'Usuário atualizado com sucesso',
  };
  }

  async delete(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }
    await this.userRepository.delete(id);
    return {
      message: 'Usuário deletado com sucesso',
    };
  }
}
