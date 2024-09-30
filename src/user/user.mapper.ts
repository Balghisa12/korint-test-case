import { User } from './user.entity';
import { UserDTO } from './user.dto';

export class UserMapper {
  static fromDtoToEntity(createUserDto: UserDTO): User {
    const user = new User();
    user.id = createUserDto.id;
    user.email = createUserDto.email;
    user.name = createUserDto.name;
    return user;
  }

  static fromEntityToDto(user: User): UserDTO {
    const dto = new UserDTO();
    dto.id = user.id;
    dto.email = user.email;
    dto.name = user.name;
    dto.claims = user.claims ? user.claims.map((claim) => claim.id) : [];
    return dto;
  }
}
