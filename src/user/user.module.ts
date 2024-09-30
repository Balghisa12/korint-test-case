import { Module } from '@nestjs/common';
import { UserControllerV1 } from './user.controller';
import { UserService } from './user.service';
import { UserMapper } from './user.mapper';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserControllerV1],
  providers: [UserService, UserMapper],
  exports: [UserService],
})
export class UserModule {}
