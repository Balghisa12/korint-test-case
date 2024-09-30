import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDTO } from './user.dto';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userDto: UserDTO): Promise<UserDTO> {
    const newUser = UserMapper.fromDtoToEntity(userDto);
    const savedUser = await this.userRepository.save(newUser);
    return UserMapper.fromEntityToDto(savedUser);
  }

  async findAll(): Promise<UserDTO[]> {
    const users = await this.userRepository.find({ relations: ['claims'] });
    return users.map(UserMapper.fromEntityToDto);
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['claims'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, userDto: UserDTO): Promise<UserDTO> {
    const user = await this.findOne(id);
    const updatedUser = { ...user, ...UserMapper.fromDtoToEntity(userDto) };
    const savedUser = await this.userRepository.save(updatedUser);
    return UserMapper.fromEntityToDto(savedUser);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }
}
