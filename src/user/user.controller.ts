import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller({
  path: 'users',
  version: '1',
})
export class UserControllerV1 {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieve all users',
    description: '',
    tags: ['User'],
  })
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Retrieve user by ID',
    description: '',
    tags: ['User'],
  })
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Create User',
    description: '',
    tags: ['User'],
  })
  create(@Body() userDto: UserDTO) {
    return this.userService.create(userDto);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update User',
    description: '',
    tags: ['User'],
  })
  update(@Param('id') id: string, @Body() userDto: UserDTO) {
    return this.userService.update(id, userDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete User',
    description: '',
    tags: ['User'],
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
