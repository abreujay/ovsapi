import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // registrar usuario
    @Post('register')
    async registerUser(@Body() createUserDto: CreateUserDto) {
        return this.usersService.registerUser(createUserDto);
    }
}
